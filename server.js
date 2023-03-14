require('dotenv').config();
const express = require('express');
const calenderRouter = require('./controllers/CalenderEvents');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Pool_ETH = require('./models/Pool_ETH');
const Pool_BSC = require('./models/Pool_BSC');
const LiquidityLock_BSC = require('./models/LiquidityLock_BSC');
const LiquidityLock_ETH = require('./models/LiquidityLock_ETH');
const TokenLock_BSC = require('./models/TokenLock_BSC');
const TokenLock_ETH = require('./models/TokenLock_ETH');
const axios = require('axios');
const { formatEther, formatUnits } = require('@ethersproject/units');

const subscriptions_bsc = [];
const alarms_bsc = [];
const subscriptions_eth = [];
const alarms_eth = [];
const liquidity_locks_eth = [];
const liquidity_locks_bsc = [];
const token_locks_eth = [];
const token_locks_bsc = [];
const routes = require('./routes');
const ido_abi = require('./abi/ido.json');
const lock_abi = require('./abi/lock.json');
const pool_abi = require('./abi/pool.json');
const pair_abi = require('./abi/pair.json');
const erc20_abi = require('./abi/erc20.json');
const app = express();
const ethers = require('ethers');
const { BigNumber } = require('ethers');
const webpush = require('web-push');

webpush.setVapidDetails(
	'mailto:thegempad@gmail.com',
	'BPBcNP9ZuD5Dk-IeFA8Uz5Sbemi3S2NjLDKW_iedPu7rASN1ZpNuL9Pin3iDSdU--kpAgyzUL4qATc0xFQajpDg',
	's44ya4zuG8byJVVqqxpVGvDyWZ34GIbT4P0-VYzkskg'
);

// const ethers_wss_bsc = new ethers.providers.WebSocketProvider(
// 	process.env.WSS_ENDPOINT_BSC
// );
// const ethers_wss_eth = new ethers.providers.WebSocketProvider(
// 	process.env.WSS_ENDPOINT_ETH
// );

// let txCount_ETH;
// let txCount_BSC;

//Add Cors
app.use(cors());
app.use(express.static(path.resolve(__dirname, './public')))
// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB successfully connected'))
	.catch((err) => console.log(err));

// Routes
app.use('/api/calender', calenderRouter);
app.use('/api', routes);
app.get('/webpush/:network/:wallet', async (req, res) => {
	let alarms = req.params.network == 'eth' ? alarms_eth : alarms_bsc;
	let subscriptions =
		req.params.network == 'eth' ? subscriptions_eth : subscriptions_bsc;

	let index = subscriptions.findIndex((ele) => ele.wallet == req.params.wallet);
	if (index == -1) return res.json({ alarms: [] });
	else {
		return res.json({
			alarms: alarms[index],
		});
	}
});
app.post('/webpush', async (req, res) => {
	let index = -1;
	let pool =
		req.body.network == 'eth'
			? await Pool_ETH.findOne({ address: req.body.pool.address })
			: await Pool_BSC.findOne({ address: req.body.pool.address });
	let subscriptions =
		req.body.network == 'eth' ? subscriptions_eth : subscriptions_bsc;
	let alarms = req.body.network == 'eth' ? alarms_eth : alarms_bsc;
	let timer;
	if (req.body.pool.status == 'presale') timer = pool.startDateTime;
	else timer = pool.listDateTime;
	timer = new Date(timer).getTime() - Number(req.body.pool.time) * 60 * 1000;

	if (timer < Date.now()) return res.json({ message: 'time error' });
	for (let i = 0; i < subscriptions.length; i++) {
		if (subscriptions[i].wallet == req.body.wallet) {
			index = i;
			break;
		}
	}
	if (index == -1) {
		subscriptions.push({
			subscription: [req.body.subscription],
			wallet: req.body.wallet,
		});
		alarms.push([
			{
				...req.body.pool,
				name: pool.name,
				symbol: pool.symbol,
				logo: pool.ipfs.logo,
				startDateTime: pool.startDateTime,
				listDateTime: pool.listDateTime,
			},
		]);
	} else {
		if (
			!subscriptions[index].subscription.find(
				(ele) =>
					ele.keys.auth == req.body.subscription.keys.auth &&
					ele.keys.p256dh == req.body.subscription.keys.p256dh
			)
		)
			subscriptions[index].subscription.push(req.body.subscription);
		let alarm = alarms[index].find(
			(ele) =>
				ele.address == req.body.pool.address &&
				ele.time == req.body.pool.time &&
				ele.status == req.body.pool.status
		);
		if (!alarm) {
			alarms[index].push({
				...req.body.pool,
				name: pool.name,
				symbol: pool.symbol,
				logo: pool.ipfs.logo,
				startDateTime: pool.startDateTime,
				listDateTime: pool.listDateTime,
			});
		}
	}
	if (pool) {
		if (!pool.alarms) {
			pool.alarms = [];
		}
		let alarms = pool.alarms;
		if (
			!alarms.find(
				(ele) =>
					ele.status == req.body.pool.status &&
					ele.time == req.body.pool.time &&
					ele.wallet == req.body.wallet
			)
		) {
			alarms.push({
				wallet: req.body.wallet,
				status: req.body.pool.status,
				time: req.body.pool.time,
			});
			pool.alarms = alarms;
			await pool.save();
		}
	}
	return res.json({ message: 'ok' });
});
app.delete('/webpush', async (req, res) => {
	let index = -1;
	let pool =
		req.body.network == 'eth'
			? await Pool_ETH.findOne({ address: req.body.pool.address })
			: await Pool_BSC.findOne({ address: req.body.pool.address });
	let subscriptions =
		req.body.network == 'eth' ? subscriptions_eth : subscriptions_bsc;
	let alarms = req.body.network == 'eth' ? alarms_eth : alarms_bsc;

	for (let i = 0; i < subscriptions.length; i++) {
		if (subscriptions[i].wallet == req.body.wallet) {
			index = i;
			break;
		}
	}
	if (index == -1) {
		return res.json({ message: 'no existed' });
	} else {
		let alarmIndex = alarms[index].findIndex(
			(ele) =>
				ele.address == req.body.pool.address &&
				ele.time == req.body.pool.time &&
				ele.status == req.body.pool.status
		);
		if (alarmIndex > -1) {
			alarms[index].splice(alarmIndex, 1);
			if (pool) {
				let poolIndex = pool.alarms.findIndex(
					(ele) =>
						ele.status == req.body.pool.status &&
						ele.time == req.body.pool.time &&
						ele.wallet == req.body.wallet
				);
				if (poolIndex > -1) {
					pool.alarms.splice(poolIndex, 1);
					await pool.save();
				}
			}
			if (alarms[index].length == 0) {
				alarms.splice(index, 1);
				subscriptions.splice(index, 1);
			}
		}
	}
	return res.json({ message: 'ok' });
});
app.delete('/webpushes', async (req, res) => {
	let index = -1;
	let pools =
		req.body.network == 'eth'
			? await Pool_ETH.find({})
			: await Pool_BSC.find({});
	let subscriptions =
		req.body.network == 'eth' ? subscriptions_eth : subscriptions_bsc;
	let alarms = req.body.network == 'eth' ? alarms_eth : alarms_bsc;

	for (let i = 0; i < subscriptions.length; i++) {
		if (subscriptions[i].wallet == req.body.wallet) {
			index = i;
			break;
		}
	}
	if (index == -1) {
		return res.json({ message: 'no existed' });
	} else {
		alarms.splice(index, 1);
		subscriptions.splice(index, 1);
		for (let i = 0; i < pools.length; i++) {
			if (pools[i].alarms) {
				pools[i].alarms = pools[i].alarms.filter(
					(ele) => ele.wallet != req.body.wallet
				);
				await pools[i].save();
			}
		}
	}
	return res.json({ message: 'ok' });
});
app.get('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Server up and running on port ${port} !`));

var http = require('http').Server(app);
// const io = require('socket.io')(http, {
// 	cors: {
// 		origin: 'http://localhost:7260',
// 	},
// });
http.listen(port, function () {
	console.log(`Server up and running on port ${port} !`);
});

//get IDO data

// const ido_contract_wss_eth = new ethers.Contract(
// 	process.env.IDO_ADDRESS_ETH,
// 	ido_abi,
// 	ethers_wss_eth
// );

// const ido_contract_wss_bsc = new ethers.Contract(
// 	process.env.IDO_ADDRESS_BSC,
// 	ido_abi,
// 	ethers_wss_bsc
// );

// const lock_contract_wss_bsc = new ethers.Contract(
// 	process.env.LOCK_ADDRESS_BSC,
// 	lock_abi,
// 	ethers_wss_bsc
// );
// const lock_contract_wss_eth = new ethers.Contract(
// 	process.env.LOCK_ADDRESS_ETH,
// 	lock_abi,
// 	ethers_wss_eth
// );

const send_alarm = async (network, address, status, time) => {
	const pool =
		network == 'eth'
			? await Pool_ETH.findOne({ address })
			: await Pool_BSC.findOne({ address });

	let subscriptions = network == 'eth' ? subscriptions_eth : subscriptions_bsc;
	let alarms = network == 'eth' ? alarms_eth : alarms_bsc;

	if (!pool) return;

	let leftAlarms = [];
	for (let i = 0; i < pool.alarms.length; i++) {
		if (status != pool.alarms[i].status || time != pool.alarms[i].time) {
			leftAlarms.push(pool.alarms[i]);
			continue;
		}
		let index = subscriptions.findIndex(
			(ele) => ele.wallet == pool.alarms[i].wallet
		);
		if (index > -1) {
			if (subscriptions[index].subscription.length < 1) continue;
			for (let k = 0; k < subscriptions[index].subscription.length; k++) {
				const pushMessageData = {
					title:
						status ==
						pool.name +
							(status == 'presale'
								? ` Presale is starting soon!`
								: ` Dex Listing is approaching!`),
					body:
						'Starts in ' +
						time +
						' minutes on ' +
						network.toUpperCase() +
						' network!',
					image: pool.ipfs.logo,
					address: address,
				};
				webpush.sendNotification(
					subscriptions[index].subscription[k],
					JSON.stringify(pushMessageData)
				);
			}
			alarms[index] = alarms[index].filter(
				(ele) =>
					ele.status != status && ele.time != time && ele.address != address
			);
		} else continue;
	}
	for (let i = 0; i < alarms.length; i++) {
		if (alarms[i].length < 1) {
			alarms.splice(i, 1);
			subscriptions.splice(i, 1);
		}
	}
	pool.alarms = leftAlarms;
	await pool.save();
};

//ETH

// const get_Pool_eth = async (address) => {
// 	try {
// 		const owner = await ido_contract_wss_eth.poolOwners(address);
// 		let isNewPool;
// 		try {
// 			isNewPool = await ido_contract_wss_eth.isNewPool(address);
// 		} catch (err) {
// 			isNewPool = false;
// 		}
// 		let is_hide = false;
// 		try {
// 			is_hide = await ido_contract_wss_eth.isHiddenPool(address);
// 		} catch (err) {}
//
// 		if (!isNewPool) {
// 			const pool_contract = new ethers.Contract(
// 				address,
// 				pool_abi,
// 				ethers_wss_eth
// 			);
//
// 			const weiRaised = formatEther(await pool_contract._weiRaised());
// 			const poolPercentFee = await pool_contract.poolPercentFee();
// 			let {
// 				hardCap,
// 				softCap,
// 				presaleRate,
// 				dexCapPercent,
// 				dexRate,
// 				projectTokenAddress,
// 				status,
// 				tier,
// 				kyc,
// 			} = await pool_contract.poolInformation();
// 			let {
// 				startDateTime,
// 				endDateTime,
// 				listDateTime,
// 				minAllocationPerUser,
// 				maxAllocationPerUser,
// 				dexLockup,
// 				extraData,
// 				// refund,
// 				whitelistable,
// 				audit,
// 				auditLink,
// 			} = await pool_contract.poolDetails();
//
// 			startDateTime = startDateTime * 1000;
// 			endDateTime = endDateTime * 1000;
// 			listDateTime = listDateTime * 1000;
// 			const erc20_contract = new ethers.Contract(
// 				projectTokenAddress,
// 				erc20_abi,
// 				ethers_wss_eth
// 			);
//
// 			hardCap = formatEther(hardCap);
// 			softCap = formatEther(softCap);
//
// 			const decimals = await erc20_contract.decimals();
// 			const totalSupply = formatUnits(
// 				await erc20_contract.totalSupply(),
// 				decimals
// 			);
// 			let {
// 				vestingAmount,
// 				unlockedVestingAmount,
// 				firstPercent,
// 				firstPeriod,
// 				eachPercent,
// 				eachPeriod,
// 			} = await pool_contract.poolVesting();
// 			vestingAmount = formatUnits(vestingAmount, decimals);
// 			unlockedVestingAmount = formatUnits(unlockedVestingAmount, decimals);
// 			presaleRate = formatUnits(presaleRate, decimals);
// 			dexRate = formatUnits(dexRate, decimals);
// 			minAllocationPerUser = formatEther(minAllocationPerUser);
// 			maxAllocationPerUser = formatEther(maxAllocationPerUser);
// 			const symbol = await erc20_contract.symbol();
// 			const name = await erc20_contract.name();
//
// 			const whiteLists = [],
// 				participantsAddresses = [];
//
// 			if (whitelistable) {
// 				let k = 0;
// 				while (true) {
// 					try {
// 						const whiteList = await pool_contract.whitelistedAddressesArray(k);
// 						whiteLists.push(whiteList);
// 					} catch (err) {
// 						break;
// 					}
// 					k++;
// 				}
// 			}
// 			let k = 0;
// 			while (true) {
// 				try {
// 					const participantsAddress = await pool_contract.participantsAddress(
// 						k
// 					);
// 					participantsAddresses.push(participantsAddress);
// 				} catch (err) {
// 					break;
// 				}
// 				k++;
// 			}
// 			let ipfs = {};
// 			try {
// 				let response_ipfs;
// 				response_ipfs = await axios.get(
// 					`https://ipfs.infura.io/ipfs/${extraData}`
// 				);
// 				ipfs = response_ipfs.data;
// 			} catch (error) {
// 				console.log(error);
// 			}
// 			const pool = {
// 				address,
// 				owner,
// 				weiRaised: weiRaised,
// 				hardCap: hardCap,
// 				softCap: softCap,
// 				presaleRate: presaleRate,
// 				dexCapPercent: Number(dexCapPercent),
// 				dexRate: dexRate,
// 				projectTokenAddress,
// 				status,
// 				tier,
// 				kyc,
// 				startDateTime,
// 				endDateTime,
// 				listDateTime,
// 				minAllocationPerUser: minAllocationPerUser,
// 				maxAllocationPerUser: maxAllocationPerUser,
// 				dexLockup,
// 				extraData,
// 				ipfs,
// 				// refund,
// 				whitelistable,
// 				decimals,
// 				whiteLists,
// 				poolPercentFee,
// 				participantsAddresses,
// 				symbol,
// 				name,
// 				totalSupply,
// 				audit,
// 				auditLink,
// 				teamVesting_amount: Number(vestingAmount),
// 				teamVesting_unlocked_amount: Number(unlockedVestingAmount),
// 				teamVesting_first_percent: firstPercent,
// 				teamVesting_first_period: firstPeriod,
// 				teamVesting_each_percent: eachPercent,
// 				teamVesting_each_period: eachPeriod,
// 				is_hide,
// 			};
// 			return pool;
// 		} else {
// 			const weiRaised = formatEther(
// 				await ido_contract_wss_eth._weiRaised(address)
// 			);
// 			const poolPercentFee = await ido_contract_wss_eth.poolPercentFee();
// 			let {
// 				hardCap,
// 				softCap,
// 				presaleRate,
// 				dexCapPercent,
// 				dexRate,
// 				projectTokenAddress,
// 				status,
// 				tier,
// 				kyc,
// 			} = await ido_contract_wss_eth.poolInformation(address);
// 			let {
// 				startDateTime,
// 				endDateTime,
// 				listDateTime,
// 				minAllocationPerUser,
// 				maxAllocationPerUser,
// 				dexLockup,
// 				extraData,
// 				// refund,
// 				whitelistable,
// 				audit,
// 				auditLink,
// 			} = await ido_contract_wss_eth.poolDetails(address);
//
// 			startDateTime = startDateTime * 1000;
// 			endDateTime = endDateTime * 1000;
// 			listDateTime = listDateTime * 1000;
// 			const erc20_contract = new ethers.Contract(
// 				projectTokenAddress,
// 				erc20_abi,
// 				ethers_wss_eth
// 			);
//
// 			hardCap = formatEther(hardCap);
// 			softCap = formatEther(softCap);
//
// 			const decimals = await erc20_contract.decimals();
// 			const totalSupply = formatUnits(
// 				await erc20_contract.totalSupply(),
// 				decimals
// 			);
// 			let {
// 				vestingAmount,
// 				unlockedVestingAmount,
// 				firstPercent,
// 				firstPeriod,
// 				eachPercent,
// 				eachPeriod,
// 			} = await ido_contract_wss_eth.poolVesting(address);
// 			vestingAmount = formatUnits(vestingAmount, decimals);
// 			unlockedVestingAmount = formatUnits(unlockedVestingAmount, decimals);
// 			presaleRate = formatUnits(presaleRate, decimals);
// 			dexRate = formatUnits(dexRate, decimals);
// 			minAllocationPerUser = formatEther(minAllocationPerUser);
// 			maxAllocationPerUser = formatEther(maxAllocationPerUser);
// 			const symbol = await erc20_contract.symbol();
// 			const name = await erc20_contract.name();
//
// 			const whiteLists = [],
// 				participantsAddresses = [];
//
// 			if (whitelistable) {
// 				let k = 0;
// 				while (true) {
// 					try {
// 						const whiteList =
// 							await ido_contract_wss_eth.whitelistedAddressesArray(address, k);
// 						whiteLists.push(whiteList);
// 					} catch (err) {
// 						break;
// 					}
// 					k++;
// 				}
// 			}
// 			let k = 0;
// 			while (true) {
// 				try {
// 					const participantsAddress =
// 						await ido_contract_wss_eth.participantsAddress(address, k);
// 					participantsAddresses.push(participantsAddress);
// 				} catch (err) {
// 					break;
// 				}
// 				k++;
// 			}
// 			let ipfs = {};
// 			try {
// 				let response_ipfs;
// 				response_ipfs = await axios.get(
// 					`https://ipfs.infura.io/ipfs/${extraData}`
// 				);
// 				ipfs = response_ipfs.data;
// 			} catch (error) {
// 				console.log(error);
// 			}
// 			const pool = {
// 				address,
// 				owner,
// 				weiRaised: weiRaised,
// 				hardCap: hardCap,
// 				softCap: softCap,
// 				presaleRate: presaleRate,
// 				dexCapPercent: Number(dexCapPercent),
// 				dexRate: dexRate,
// 				projectTokenAddress,
// 				status,
// 				tier,
// 				kyc,
// 				startDateTime,
// 				endDateTime,
// 				listDateTime,
// 				minAllocationPerUser: minAllocationPerUser,
// 				maxAllocationPerUser: maxAllocationPerUser,
// 				dexLockup,
// 				extraData,
// 				ipfs,
// 				// refund,
// 				whitelistable,
// 				decimals,
// 				whiteLists,
// 				poolPercentFee,
// 				participantsAddresses,
// 				symbol,
// 				name,
// 				totalSupply,
// 				audit,
// 				auditLink,
// 				teamVesting_amount: Number(vestingAmount),
// 				teamVesting_unlocked_amount: Number(unlockedVestingAmount),
// 				teamVesting_first_percent: firstPercent,
// 				teamVesting_first_period: firstPeriod,
// 				teamVesting_each_percent: eachPercent,
// 				teamVesting_each_period: eachPeriod,
// 				is_hide,
// 			};
// 			return pool;
// 		}
// 	} catch (err) {
// 		return null;
// 	}
// };
// const startPool_eth = async (address) => {
//   try {
//     txCount_ETH++;
//     const tx = await ido_contract_wss_eth.startPool(address, { nonce: txCount_ETH });
//     console.log(`start pool transaction: ${tx.hash}`);
//   } catch (err) {
//     txCount_ETH--;
//     console.log('start error');
//     console.log(err);
//     try {
//       const pool_contract = new ethers.Contract(address, pool_abi, ethers_wss_eth);

//       let {
//         status
//       } = await pool_contract.poolInformation();
//       if (status == 0) {
//         setTimeout(startPool_eth, 5000, address);
//       }

//     } catch (err) {

//     }
//   }

// }

// const endPool_eth = async (address) => {
//   const pool_contract = new ethers.Contract(address, pool_abi, ethers_wss_eth);

//   let count = 0;
//   while (true) {
//     try {
//       const participantsAddress = await pool_contract.participantsAddress(count);
//     } catch (err) {
//       break;
//     }
//     count++;
//   }
//   try {
//     for (let i = 0; i < count; i++) {
//       txCount_ETH++;
//       const tx = await ido_contract_wss_eth.refundPool(address, {nonce:txCount_ETH});
//       console.log('refund transaction : ' + tx.hash);
//     }
//     txCount_ETH++;
//     const tx =await ido_contract_wss_eth.endPool(address, {nonce:txCount_ETH});
//     console.log('end pool transaction : ' + tx.hash);
//   } catch (err) {
//     txCount_ETH--;
//     console.log('end error');
//     console.log(err);
//     try {
//       let {
//         status
//       } = await pool_contract.poolInformation();
//       if (status < 2) {
//         setTimeout(endPool_eth, 5000, address);
//       }

//     } catch (err) {

//     }
//   }
// }
/*const get_IDO_eth = async () => {
	// txCount_ETH = await ethers_wss_eth.getTransactionCount();
	// txCount_ETH--;
	// await Pool_ETH.deleteMany({});

	let i = 0;
	// const fixedFee=await ido_contract_wss_eth.poolFixedFee();
	// const percentFee=await ido_contract_wss_eth.poolPercentFee();
	// const ido={ fixedFee, percentFee };
	while (true) {
		try {
			const address = await ido_contract_wss_eth.poolAddresses(i);
			const pool = await get_Pool_eth(address);
			if (pool != null) {
				const newPool = new Pool_ETH(pool);
				await newPool.save();
				// let startTimeOut, endTimeOut;
				// if (pool.status == 0)
				//   startTimeOut = setTimeout(startPool_eth, parseInt(pool.startDateTime) - Date.now(), address);
				// if (pool.status <= 2)
				//   endTimeOut = setTimeout(endPool_eth, parseInt(pool.endDateTime) - Date.now(), address);
				// pool.startTimeOut = startTimeOut;
				// pool.endTimeOut = endTimeOut;
				setTimeout(
					send_alarm,
					parseInt(pool.startDateTime) - Date.now() - 5 * 60 * 1000,
					'eth',
					address,
					'presale',
					'5'
				);
				setTimeout(
					send_alarm,
					parseInt(pool.startDateTime) - Date.now() - 15 * 60 * 1000,
					'eth',
					address,
					'presale',
					'15'
				);
				setTimeout(
					send_alarm,
					parseInt(pool.startDateTime) - Date.now() - 30 * 60 * 1000,
					'eth',
					address,
					'presale',
					'30'
				);
				setTimeout(
					send_alarm,
					parseInt(pool.listDateTime) - Date.now() - 5 * 60 * 1000,
					'eth',
					address,
					'listing',
					'5'
				);
				setTimeout(
					send_alarm,
					parseInt(pool.listDateTime) - Date.now() - 15 * 60 * 1000,
					'eth',
					address,
					'listing',
					'15'
				);
				setTimeout(
					send_alarm,
					parseInt(pool.listDateTime) - Date.now() - 30 * 60 * 1000,
					'eth',
					address,
					'listing',
					'30'
				);
			}
		} catch (err) {
			break;
		}
		i++;
	}

	ido_contract_wss_eth.on('LogPoolKYCUpdate', async (pool, kyc) => {
		await Pool_ETH.findOneAndUpdate({ address: pool }, { kyc: kyc });
		io.emit('launchpad:eth:LogPoolKYCUpdate', {
			pool,
			kye,
		});
	});
	ido_contract_wss_eth.on(
		'LogPoolAuditUpdate',
		async (pool, audit, auditLink) => {
			await Pool_ETH.findOneAndUpdate(
				{ address: pool },
				{ audit: audit, auditLink: auditLink }
			);
			io.emit('launchpad:eth:LogPoolAuditUpdate', {
				pool,
				audit,
				auditLink,
			});
		}
	);
	ido_contract_wss_eth.on(
		'LogPoolCreated',
		async (
			poolOwner,
			pool_address,
			model,
			details,
			poolPercentFee,
			poolTokenPercentFee,
			vesting
		) => {
			console.log('LogPoolCreated');
			console.log(pool_address);
			try {
				let ipfs = {};
				const weiRaised = 0;
				let {
					hardCap,
					softCap,
					presaleRate,
					dexCapPercent,
					dexRate,
					projectTokenAddress,
					status,
					tier,
					kyc,
				} = model;
				let {
					startDateTime,
					endDateTime,
					listDateTime,
					minAllocationPerUser,
					maxAllocationPerUser,
					dexLockup,
					extraData,
					// refund,
					whitelistable,
					audit,
					auditLink,
				} = details;

				startDateTime = startDateTime * 1000;
				endDateTime = endDateTime * 1000;
				listDateTime = listDateTime * 1000;
				const erc20_contract = new ethers.Contract(
					projectTokenAddress,
					erc20_abi,
					ethers_wss_eth
				);

				hardCap = formatEther(hardCap);
				softCap = formatEther(softCap);

				const decimals = await erc20_contract.decimals();
				const totalSupply = formatUnits(
					await erc20_contract.totalSupply(),
					decimals
				);
				let {
					vestingAmount,
					unlockedVestingAmount,
					firstPercent,
					firstPeriod,
					eachPercent,
					eachPeriod,
				} = vesting;
				vestingAmount = formatUnits(vestingAmount, decimals);
				unlockedVestingAmount = formatUnits(unlockedVestingAmount, decimals);
				presaleRate = formatUnits(presaleRate, decimals);
				dexRate = formatUnits(dexRate, decimals);
				minAllocationPerUser = formatEther(minAllocationPerUser);
				maxAllocationPerUser = formatEther(maxAllocationPerUser);
				const symbol = await erc20_contract.symbol();
				const name = await erc20_contract.name();

				const whiteLists = [],
					participantsAddresses = [];

				try {
					let response_ipfs;
					response_ipfs = await axios.get(
						`https://ipfs.infura.io/ipfs/${extraData}`
					);
					ipfs = response_ipfs.data;
				} catch (error) {
					console.log(error);
				}
				const pool = {
					address: pool_address,
					owner: poolOwner,
					weiRaised: weiRaised,
					hardCap: hardCap,
					softCap: softCap,
					presaleRate: presaleRate,
					dexCapPercent: Number(dexCapPercent),
					dexRate: dexRate,
					projectTokenAddress,
					status,
					tier,
					kyc,
					startDateTime,
					endDateTime,
					listDateTime,
					minAllocationPerUser: minAllocationPerUser,
					maxAllocationPerUser: maxAllocationPerUser,
					dexLockup,
					extraData,
					ipfs,
					// refund,
					whitelistable,
					decimals,
					whiteLists,
					poolPercentFee,
					participantsAddresses,
					symbol,
					name,
					totalSupply,
					audit,
					auditLink,
					teamVesting_amount: Number(vestingAmount),
					teamVesting_unlocked_amount: Number(unlockedVestingAmount),
					teamVesting_first_percent: firstPercent,
					teamVesting_first_period: firstPeriod,
					teamVesting_each_percent: eachPercent,
					teamVesting_each_period: eachPeriod,
					is_hide: false,
				};
				if (pool != null) {
					const newPool = new Pool_ETH(pool);
					await newPool.save();
					// let startTimeOut, endTimeOut;
					// if (pool.status == 0)
					//   startTimeOut = setTimeout(startPool_eth, parseInt(pool.startDateTime) - Date.now(), pool.address);
					// if (pool.status <= 2)
					//   endTimeOut = setTimeout(endPool_eth, parseInt(pool.endDateTime) - Date.now(), pool.address);
					// pool.startTimeOut = startTimeOut;
					// pool.endTimeOut = endTimeOut;
					setTimeout(
						send_alarm,
						parseInt(pool.startDateTime) - Date.now() - 5 * 60 * 1000,
						'eth',
						pool_address,
						'presale',
						'5'
					);
					setTimeout(
						send_alarm,
						parseInt(pool.startDateTime) - Date.now() - 15 * 60 * 1000,
						'eth',
						pool_address,
						'presale',
						'15'
					);
					setTimeout(
						send_alarm,
						parseInt(pool.startDateTime) - Date.now() - 30 * 60 * 1000,
						'eth',
						pool_address,
						'presale',
						'30'
					);
					setTimeout(
						send_alarm,
						parseInt(pool.listDateTime) - Date.now() - 5 * 60 * 1000,
						'eth',
						pool_address,
						'listing',
						'5'
					);
					setTimeout(
						send_alarm,
						parseInt(pool.listDateTime) - Date.now() - 15 * 60 * 1000,
						'eth',
						pool_address,
						'listing',
						'15'
					);
					setTimeout(
						send_alarm,
						parseInt(pool.listDateTime) - Date.now() - 30 * 60 * 1000,
						'eth',
						pool_address,
						'listing',
						'30'
					);
				}
			} catch (err) {
				return null;
			}
		}
	);

	ido_contract_wss_eth.on('LogPoolExtraData', async (pool, _extraData) => {
		let ipfs = {};
		try {
			let response_ipfs;
			response_ipfs = await axios.get(
				`https://ipfs.infura.io/ipfs/${_extraData}`
			);
			ipfs = response_ipfs.data;
		} catch (error) {
			console.log(error);
		}
		io.emit('launchpad:eth:LogPoolExtraData', {
			pool,
			_extraData,
			ipfs,
		});
		await Pool_ETH.findOneAndUpdate(
			{ address: pool },
			{ extraData: _extraData, ipfs: ipfs }
		);
	});

	ido_contract_wss_eth.on('LogPoolTierUpdate', async (pool, _tier) => {
		await Pool_ETH.findOneAndUpdate({ address: pool }, { tier: _tier });
		io.emit('launchpad:eth:LogPoolTierUpdate', {
			pool,
			_tier,
		});
	});
	ido_contract_wss_eth.on('LogDeposit', async (pool, participant, amount) => {
		io.emit('launchpad:eth:LogDeposit', {
			pool,
			participant,
			amount,
		});
		try {
			const newParticipant = participant;
			let isNewPool;
			try {
				isNewPool = await ido_contract_wss_eth.isNewPool(pool);
			} catch (err) {
				isNewPool = false;
			}
			let weiRaised;
			if (!isNewPool) {
				const pool_contract = new ethers.Contract(
					pool,
					pool_abi,
					ethers_wss_eth
				);
				weiRaised = formatEther(await pool_contract._weiRaised());
			} else {
				weiRaised = formatEther(await ido_contract_wss_eth._weiRaised(pool));
			}

			console.log('Log Deposit');
			console.log(weiRaised);
			const pool_eth = await Pool_ETH.findOne({ address: pool });
			const participants = pool_eth.participantsAddresses;
			pool_eth.weiRaised = weiRaised;
			let isExisted = false;
			for (let i = 0; i < participants.length; i++) {
				if (participants[i] == newParticipant) {
					isExisted = true;
					break;
				}
			}
			if (!isExisted) {
				participants.push(newParticipant);
				pool_eth.participantsAddresses = participants;
			}
			await pool_eth.save();
		} catch (err) {
			console.log(err);
		}
	});

	ido_contract_wss_eth.on('LogPoolStatusChanged', async (pool, status) => {
		io.emit('launchpad:eth:LogPoolStatusChanged', {
			pool,
			status,
		});
		await Pool_ETH.findOneAndUpdate({ address: pool }, { status: status });
	});

	ido_contract_wss_eth.on(
		'LogUpdateWhitelistable',
		async (pool, whitelistable) => {
			io.emit('launchpad:eth:LogUpdateWhitelistable', {
				pool,
				whitelistable,
			});
			await Pool_ETH.findOneAndUpdate(
				{ address: pool },
				{ whitelistable: whitelistable }
			);
		}
	);

	// ido_contract_wss_eth.on("LogPoolRemoved", async (pool) => {
	//   await Pool_ETH.deleteOne({ address: pool });
	// });

	ido_contract_wss_eth.on(
		'LogAddressWhitelisted',
		async (pool_address, whitelistedAddresses) => {
			io.emit('launchpad:eth:LogAddressWhitelisted', {
				pool_address,
				whitelistedAddresses,
			});
			const pool = await Pool_ETH.findOne({ address: pool_address });
			for (ele of whitelistedAddresses) {
				if (!pool.whiteLists.find((ele1) => ele1 == ele)) {
					await Pool_ETH.findOneAndUpdate(
						{ address: pool_address },
						{ $push: { whiteLists: ele } }
					);
				}
			}
		}
	);
	ido_contract_wss_eth.on(
		'LogPoolUnlockVestingToken',
		async (_pool, unlockedVestingAmount) => {
			io.emit('launchpad:eth:LogPoolUnlockVestingToken', {
				_pool,
				unlockedVestingAmount,
			});
			try {
				const pool_eth = await Pool_ETH.findOne({ address: _pool });
				pool_eth.teamVesting_unlocked_amount = Number(
					formatUnits(unlockedVestingAmount, pool_eth.decimals)
				);
				await pool_eth.save();
			} catch (err) {
				console.log(err);
			}
		}
	);
	ido_contract_wss_eth.on('LogPoolHide', async (_pool, isHide) => {
		console.log(_pool);
		console.log(isHide);
		io.emit('launchpad:eth:LogPoolHide', {
			pool: _pool,
			isHide,
		});
		await Pool_ETH.findOneAndUpdate({ address: _pool }, { is_hide: isHide });
	});
};*/
// get_IDO_eth();

//BSC

// const get_Pool_bsc = async (address) => {
// 	try {
// 		const owner = await ido_contract_wss_bsc.poolOwners(address);
// 		let isNewPool;
// 		try {
// 			isNewPool = await ido_contract_wss_bsc.isNewPool(address);
// 		} catch (err) {
// 			isNewPool = false;
// 		}
// 		let is_hide = false;
// 		try {
// 			is_hide = await ido_contract_wss_bsc.isHiddenPool(address);
// 		} catch (err) {}
// 		if (!isNewPool) {
// 			const pool_contract = new ethers.Contract(
// 				address,
// 				pool_abi,
// 				ethers_wss_bsc
// 			);
// 			const weiRaised = formatEther(await pool_contract._weiRaised());
//
// 			const poolPercentFee = await pool_contract.poolPercentFee();
// 			let {
// 				hardCap,
// 				softCap,
// 				presaleRate,
// 				dexCapPercent,
// 				dexRate,
// 				projectTokenAddress,
// 				status,
// 				tier,
// 				kyc,
// 			} = await pool_contract.poolInformation();
// 			let {
// 				startDateTime,
// 				endDateTime,
// 				listDateTime,
// 				minAllocationPerUser,
// 				maxAllocationPerUser,
// 				dexLockup,
// 				extraData,
// 				// refund,
// 				whitelistable,
// 				audit,
// 				auditLink,
// 			} = await pool_contract.poolDetails();
// 			startDateTime = startDateTime * 1000;
// 			endDateTime = endDateTime * 1000;
// 			listDateTime = listDateTime * 1000;
// 			const erc20_contract = new ethers.Contract(
// 				projectTokenAddress,
// 				erc20_abi,
// 				ethers_wss_bsc
// 			);
//
// 			let ipfs = {};
// 			hardCap = formatEther(hardCap);
// 			softCap = formatEther(softCap);
//
// 			const decimals = await erc20_contract.decimals();
// 			let totalSupply = formatUnits(
// 				await erc20_contract.totalSupply(),
// 				decimals
// 			);
// 			let {
// 				vestingAmount,
// 				unlockedVestingAmount,
// 				firstPercent,
// 				firstPeriod,
// 				eachPercent,
// 				eachPeriod,
// 			} = await pool_contract.poolVesting();
// 			vestingAmount = formatUnits(vestingAmount, decimals);
// 			unlockedVestingAmount = formatUnits(unlockedVestingAmount, decimals);
// 			presaleRate = formatUnits(presaleRate, decimals);
// 			dexRate = formatUnits(dexRate, decimals);
// 			minAllocationPerUser = formatEther(minAllocationPerUser);
// 			maxAllocationPerUser = formatEther(maxAllocationPerUser);
// 			const symbol = await erc20_contract.symbol();
// 			const name = await erc20_contract.name();
// 			const whiteLists = [],
// 				participantsAddresses = [];
//
// 			if (whitelistable) {
// 				let k = 0;
// 				while (true) {
// 					try {
// 						const whiteList = await pool_contract.whitelistedAddressesArray(k);
// 						whiteLists.push(whiteList);
// 					} catch (err) {
// 						break;
// 					}
// 					k++;
// 				}
// 			}
// 			let k = 0;
// 			while (true) {
// 				try {
// 					const participantsAddress = await pool_contract.participantsAddress(
// 						k
// 					);
// 					participantsAddresses.push(participantsAddress);
// 				} catch (err) {
// 					break;
// 				}
// 				k++;
// 			}
// 			try {
// 				let response_ipfs;
// 				response_ipfs = await axios.get(
// 					`https://ipfs.infura.io/ipfs/${extraData}`
// 				);
// 				ipfs = response_ipfs.data;
// 			} catch (error) {
// 				console.log(error);
// 			}
// 			const pool = {
// 				address,
// 				owner,
// 				weiRaised: weiRaised,
// 				hardCap: hardCap,
// 				softCap: softCap,
// 				presaleRate: presaleRate,
// 				dexCapPercent: Number(dexCapPercent),
// 				dexRate: dexRate,
// 				projectTokenAddress,
// 				status,
// 				tier,
// 				kyc,
// 				startDateTime,
// 				endDateTime,
// 				listDateTime,
// 				minAllocationPerUser: minAllocationPerUser,
// 				maxAllocationPerUser: maxAllocationPerUser,
// 				dexLockup,
// 				extraData,
// 				ipfs,
// 				// refund,
// 				whitelistable,
// 				decimals,
// 				whiteLists,
// 				poolPercentFee,
// 				participantsAddresses,
// 				symbol,
// 				name,
// 				totalSupply,
// 				audit,
// 				auditLink,
// 				teamVesting_amount: Number(vestingAmount),
// 				teamVesting_unlocked_amount: Number(unlockedVestingAmount),
// 				teamVesting_first_percent: firstPercent,
// 				teamVesting_first_period: firstPeriod,
// 				teamVesting_each_percent: eachPercent,
// 				teamVesting_each_period: eachPeriod,
// 				is_hide,
// 			};
// 			return pool;
// 		} else {
// 			const weiRaised = formatEther(
// 				await ido_contract_wss_bsc._weiRaised(address)
// 			);
//
// 			const poolPercentFee = await ido_contract_wss_bsc.poolPercentFee();
// 			let {
// 				hardCap,
// 				softCap,
// 				presaleRate,
// 				dexCapPercent,
// 				dexRate,
// 				projectTokenAddress,
// 				status,
// 				tier,
// 				kyc,
// 			} = await ido_contract_wss_bsc.poolInformation(address);
// 			let {
// 				startDateTime,
// 				endDateTime,
// 				listDateTime,
// 				minAllocationPerUser,
// 				maxAllocationPerUser,
// 				dexLockup,
// 				extraData,
// 				// refund,
// 				whitelistable,
// 				audit,
// 				auditLink,
// 			} = await ido_contract_wss_bsc.poolDetails(address);
//
// 			startDateTime = startDateTime * 1000;
// 			endDateTime = endDateTime * 1000;
// 			listDateTime = listDateTime * 1000;
// 			const erc20_contract = new ethers.Contract(
// 				projectTokenAddress,
// 				erc20_abi,
// 				ethers_wss_bsc
// 			);
//
// 			let ipfs = {};
// 			hardCap = formatEther(hardCap);
// 			softCap = formatEther(softCap);
//
// 			const decimals = await erc20_contract.decimals();
// 			let totalSupply = formatUnits(
// 				await erc20_contract.totalSupply(),
// 				decimals
// 			);
// 			let {
// 				vestingAmount,
// 				unlockedVestingAmount,
// 				firstPercent,
// 				firstPeriod,
// 				eachPercent,
// 				eachPeriod,
// 			} = await ido_contract_wss_bsc.poolVesting(address);
// 			vestingAmount = formatUnits(vestingAmount, decimals);
// 			unlockedVestingAmount = formatUnits(unlockedVestingAmount, decimals);
// 			presaleRate = formatUnits(presaleRate, decimals);
// 			dexRate = formatUnits(dexRate, decimals);
// 			minAllocationPerUser = formatEther(minAllocationPerUser);
// 			maxAllocationPerUser = formatEther(maxAllocationPerUser);
// 			const symbol = await erc20_contract.symbol();
// 			const name = await erc20_contract.name();
//
// 			const whiteLists = [],
// 				participantsAddresses = [];
//
// 			if (whitelistable) {
// 				let k = 0;
// 				while (true) {
// 					try {
// 						const whiteList =
// 							await ido_contract_wss_bsc.whitelistedAddressesArray(address, k);
// 						whiteLists.push(whiteList);
// 					} catch (err) {
// 						break;
// 					}
// 					k++;
// 				}
// 			}
// 			let k = 0;
// 			while (true) {
// 				try {
// 					const participantsAddress =
// 						await ido_contract_wss_bsc.participantsAddress(address, k);
// 					participantsAddresses.push(participantsAddress);
// 				} catch (err) {
// 					break;
// 				}
// 				k++;
// 			}
// 			try {
// 				let response_ipfs;
// 				response_ipfs = await axios.get(
// 					`https://ipfs.infura.io/ipfs/${extraData}`
// 				);
// 				ipfs = response_ipfs.data;
// 			} catch (error) {
// 				console.log(error);
// 			}
// 			const pool = {
// 				address,
// 				owner,
// 				weiRaised: weiRaised,
// 				hardCap: hardCap,
// 				softCap: softCap,
// 				presaleRate: presaleRate,
// 				dexCapPercent: Number(dexCapPercent),
// 				dexRate: dexRate,
// 				projectTokenAddress,
// 				status,
// 				tier,
// 				kyc,
// 				startDateTime,
// 				endDateTime,
// 				listDateTime,
// 				minAllocationPerUser: minAllocationPerUser,
// 				maxAllocationPerUser: maxAllocationPerUser,
// 				dexLockup,
// 				extraData,
// 				ipfs,
// 				// refund,
// 				whitelistable,
// 				decimals,
// 				whiteLists,
// 				poolPercentFee,
// 				participantsAddresses,
// 				symbol,
// 				name,
// 				totalSupply,
// 				audit,
// 				auditLink,
// 				teamVesting_amount: Number(vestingAmount),
// 				teamVesting_unlocked_amount: Number(unlockedVestingAmount),
// 				teamVesting_first_percent: firstPercent,
// 				teamVesting_first_period: firstPeriod,
// 				teamVesting_each_percent: eachPercent,
// 				teamVesting_each_period: eachPeriod,
// 				is_hide,
// 			};
// 			// console.log(pool);
// 			return pool;
// 		}
// 	} catch (err) {
// 		return null;
// 	}
// };

// const startPool_bsc = async (address) => {
//   try {
//     txCount_BSC++;
//     const tx = await ido_contract_wss_bsc.startPool(address, {nonce:txCount_BSC});
//     console.log(`start pool transaction: ${tx.hash}`);
//   } catch (err) {
//     txCount_BSC--;
//     console.log('start error');
//     console.log(err);
//     try {
//       const pool_contract = new ethers.Contract(address, pool_abi, ethers_wss_bsc);

//       let {
//         status
//       } = await pool_contract.poolInformation();
//       if (status == 0) {
//         setTimeout(startPool_bsc, 5000, address);
//       }

//     } catch (err) {

//     }
//   }

// }

// const endPool_bsc = async (address) => {
//   const pool_contract = new ethers.Contract(address, pool_abi, ethers_wss_bsc);

//   let count = 0;
//   while (true) {
//     try {
//       const participantsAddress = await pool_contract.participantsAddress(count);
//     } catch (err) {
//       break;
//     }
//     count++;
//   }
//   try {
//     for (let i = 0; i < count; i++) {
//       txCount_BSC++;
//       const tx = await ido_contract_wss_bsc.refundPool(address, {nonce:txCount_BSC});
//       console.log('refund transaction : ' + tx.hash);
//     }
//     txCount_BSC++;
//     const tx =await ido_contract_wss_bsc.endPool(address, {nonce:txCount_BSC});
//     console.log('end pool transaction : ' + tx.hash);
//   } catch (err) {
//     txCount_BSC--;
//     console.log('end error');
//     console.log(err);
//     try {
//       let {
//         status
//       } = await pool_contract.poolInformation();
//       if (status < 2) {
//         setTimeout(endPool_bsc, 5000, address);
//       }

//     } catch (err) {

//     }
//   }
// }
// const get_IDO_bsc = async () => {
// 	// txCount_BSC = await ethers_wss_bsc.getTransactionCount();
// 	// txCount_BSC--;
// 	// await Pool_BSC.deleteMany({});
//
// 	let i = 0;
// 	// const fixedFee=await ido_contract_wss_bsc.poolFixedFee();
// 	// const percentFee=await ido_contract_wss_bsc.poolPercentFee();
// 	// const ido={ fixedFee, percentFee };
// 	while (true) {
// 		try {
// 			const address = await ido_contract_wss_bsc.poolAddresses(i);
// 			const pool = await get_Pool_bsc(address);
//
// 			if (pool != null) {
// 				const newPool = new Pool_BSC(pool);
// 				await newPool.save();
// 				// let startTimeOut, endTimeOut;
// 				// if (pool.status == 0)
// 				//   startTimeOut = setTimeout(startPool_bsc, parseInt(pool.startDateTime) - Date.now(), address);
// 				// if (pool.status <= 2)
// 				//   endTimeOut = setTimeout(endPool_bsc, parseInt(pool.endDateTime) - Date.now(), address);
// 				// pool.startTimeOut = startTimeOut;
// 				// pool.endTimeOut = endTimeOut;
// 				setTimeout(
// 					send_alarm,
// 					parseInt(pool.startDateTime) - Date.now() - 5 * 60 * 1000,
// 					'bsc',
// 					address,
// 					'presale',
// 					'5'
// 				);
// 				setTimeout(
// 					send_alarm,
// 					parseInt(pool.startDateTime) - Date.now() - 15 * 60 * 1000,
// 					'bsc',
// 					address,
// 					'presale',
// 					'15'
// 				);
// 				setTimeout(
// 					send_alarm,
// 					parseInt(pool.startDateTime) - Date.now() - 30 * 60 * 1000,
// 					'bsc',
// 					address,
// 					'presale',
// 					'30'
// 				);
// 				setTimeout(
// 					send_alarm,
// 					parseInt(pool.listDateTime) - Date.now() - 5 * 60 * 1000,
// 					'bsc',
// 					address,
// 					'listing',
// 					'5'
// 				);
// 				setTimeout(
// 					send_alarm,
// 					parseInt(pool.listDateTime) - Date.now() - 15 * 60 * 1000,
// 					'bsc',
// 					address,
// 					'listing',
// 					'15'
// 				);
// 				setTimeout(
// 					send_alarm,
// 					parseInt(pool.listDateTime) - Date.now() - 30 * 60 * 1000,
// 					'bsc',
// 					address,
// 					'listing',
// 					'30'
// 				);
// 			}
// 		} catch (err) {
// 			break;
// 		}
// 		i++;
// 	}
// 	ido_contract_wss_bsc.on('LogPoolKYCUpdate', async (pool, kyc) => {
// 		io.emit('launchpad:bsc:LogPoolKYCUpdate', {
// 			pool,
// 			kyc,
// 		});
// 		await Pool_BSC.findOneAndUpdate({ address: pool }, { kyc: kyc });
// 	});
// 	ido_contract_wss_bsc.on(
// 		'LogPoolAuditUpdate',
// 		async (pool, audit, auditLink) => {
// 			io.emit('launchpad:bsc:LogPoolAuditUpdate', {
// 				pool,
// 				audit,
// 				auditLink,
// 			});
// 			await Pool_BSC.findOneAndUpdate(
// 				{ address: pool },
// 				{ audit: audit, auditLink: auditLink }
// 			);
// 		}
// 	);
// 	ido_contract_wss_bsc.on(
// 		'LogPoolCreated',
// 		async (
// 			poolOwner,
// 			pool_address,
// 			model,
// 			details,
// 			poolPercentFee,
// 			poolTokenPercentFee,
// 			vesting
// 		) => {
// 			console.log('LogPoolCreated');
// 			console.log(pool_address);
// 			try {
// 				let ipfs = {};
// 				const weiRaised = 0;
// 				let {
// 					hardCap,
// 					softCap,
// 					presaleRate,
// 					dexCapPercent,
// 					dexRate,
// 					projectTokenAddress,
// 					status,
// 					tier,
// 					kyc,
// 				} = model;
// 				let {
// 					startDateTime,
// 					endDateTime,
// 					listDateTime,
// 					minAllocationPerUser,
// 					maxAllocationPerUser,
// 					dexLockup,
// 					extraData,
// 					// refund,
// 					whitelistable,
// 					audit,
// 					auditLink,
// 				} = details;
//
// 				startDateTime = startDateTime * 1000;
// 				endDateTime = endDateTime * 1000;
// 				listDateTime = listDateTime * 1000;
// 				const erc20_contract = new ethers.Contract(
// 					projectTokenAddress,
// 					erc20_abi,
// 					ethers_wss_bsc
// 				);
//
// 				hardCap = formatEther(hardCap);
// 				softCap = formatEther(softCap);
//
// 				const decimals = await erc20_contract.decimals();
// 				const totalSupply = formatUnits(
// 					await erc20_contract.totalSupply(),
// 					decimals
// 				);
// 				let {
// 					vestingAmount,
// 					unlockedVestingAmount,
// 					firstPercent,
// 					firstPeriod,
// 					eachPercent,
// 					eachPeriod,
// 				} = vesting;
// 				vestingAmount = formatUnits(vestingAmount, decimals);
// 				unlockedVestingAmount = formatUnits(unlockedVestingAmount, decimals);
// 				presaleRate = formatUnits(presaleRate, decimals);
// 				dexRate = formatUnits(dexRate, decimals);
// 				minAllocationPerUser = formatEther(minAllocationPerUser);
// 				maxAllocationPerUser = formatEther(maxAllocationPerUser);
// 				const symbol = await erc20_contract.symbol();
// 				const name = await erc20_contract.name();
//
// 				const whiteLists = [],
// 					participantsAddresses = [];
//
// 				try {
// 					let response_ipfs;
// 					response_ipfs = await axios.get(
// 						`https://ipfs.infura.io/ipfs/${extraData}`
// 					);
// 					ipfs = response_ipfs.data;
// 				} catch (error) {
// 					console.log(error);
// 				}
// 				const pool = {
// 					address: pool_address,
// 					owner: poolOwner,
// 					weiRaised: weiRaised,
// 					hardCap: hardCap,
// 					softCap: softCap,
// 					presaleRate: presaleRate,
// 					dexCapPercent: Number(dexCapPercent),
// 					dexRate: dexRate,
// 					projectTokenAddress,
// 					status,
// 					tier,
// 					kyc,
// 					startDateTime,
// 					endDateTime,
// 					listDateTime,
// 					minAllocationPerUser: minAllocationPerUser,
// 					maxAllocationPerUser: maxAllocationPerUser,
// 					dexLockup,
// 					extraData,
// 					ipfs,
// 					// refund,
// 					whitelistable,
// 					decimals,
// 					whiteLists,
// 					poolPercentFee,
// 					participantsAddresses,
// 					symbol,
// 					name,
// 					totalSupply,
// 					audit,
// 					auditLink,
// 					teamVesting_amount: Number(vestingAmount),
// 					teamVesting_unlocked_amount: Number(unlockedVestingAmount),
// 					teamVesting_first_percent: firstPercent,
// 					teamVesting_first_period: firstPeriod,
// 					teamVesting_each_percent: eachPercent,
// 					teamVesting_each_period: eachPeriod,
// 					is_hide: false,
// 				};
// 				if (pool != null) {
// 					const newPool = new Pool_BSC(pool);
// 					await newPool.save();
// 					// let startTimeOut, endTimeOut;
// 					// if (pool.status == 0)
// 					//   startTimeOut = setTimeout(startPool_bsc, parseInt(pool.startDateTime) - Date.now(), pool.address);
// 					// if (pool.status <= 2)
// 					//   endTimeOut = setTimeout(endPool_bsc, parseInt(pool.endDateTime) - Date.now(), pool.address);
// 					// pool.startTimeOut = startTimeOut;
// 					// pool.endTimeOut = endTimeOut;
// 					setTimeout(
// 						send_alarm,
// 						parseInt(pool.startDateTime) - Date.now() - 5 * 60 * 1000,
// 						'bsc',
// 						pool_address,
// 						'presale',
// 						'5'
// 					);
// 					setTimeout(
// 						send_alarm,
// 						parseInt(pool.startDateTime) - Date.now() - 15 * 60 * 1000,
// 						'bsc',
// 						pool_address,
// 						'presale',
// 						'15'
// 					);
// 					setTimeout(
// 						send_alarm,
// 						parseInt(pool.startDateTime) - Date.now() - 30 * 60 * 1000,
// 						'bsc',
// 						pool_address,
// 						'presale',
// 						'30'
// 					);
// 					setTimeout(
// 						send_alarm,
// 						parseInt(pool.listDateTime) - Date.now() - 5 * 60 * 1000,
// 						'bsc',
// 						pool_address,
// 						'listing',
// 						'5'
// 					);
// 					setTimeout(
// 						send_alarm,
// 						parseInt(pool.listDateTime) - Date.now() - 15 * 60 * 1000,
// 						'bsc',
// 						pool_address,
// 						'listing',
// 						'15'
// 					);
// 					setTimeout(
// 						send_alarm,
// 						parseInt(pool.listDateTime) - Date.now() - 30 * 60 * 1000,
// 						'bsc',
// 						pool_address,
// 						'listing',
// 						'30'
// 					);
// 				}
// 			} catch (err) {
// 				return null;
// 			}
// 		}
// 	);
//
// 	ido_contract_wss_bsc.on('LogPoolExtraData', async (pool, _extraData) => {
// 		let ipfs = {};
// 		try {
// 			let response_ipfs;
// 			response_ipfs = await axios.get(
// 				`https://ipfs.infura.io/ipfs/${_extraData}`
// 			);
// 			ipfs = response_ipfs.data;
// 		} catch (error) {
// 			console.log(error);
// 		}
// 		io.emit('launchpad:bsc:LogPoolExtraData', {
// 			pool,
// 			_extraData,
// 			ipfs,
// 		});
// 		await Pool_BSC.findOneAndUpdate(
// 			{ address: pool },
// 			{ extraData: _extraData, ipfs }
// 		);
// 	});
// 	ido_contract_wss_bsc.on('LogPoolTierUpdate', async (pool, _tier) => {
// 		io.emit('launchpad:bsc:LogPoolTierUpdate', {
// 			pool,
// 			_tier,
// 		});
// 		await Pool_BSC.findOneAndUpdate({ address: pool }, { tier: _tier });
// 	});
// 	ido_contract_wss_bsc.on('LogDeposit', async (pool, participant, amount) => {
// 		io.emit('launchpad:bsc:LogDeposit', {
// 			pool,
// 			participant,
// 			amount,
// 		});
// 		try {
// 			const newParticipant = participant;
// 			let weiRaised;
// 			let isNewPool;
// 			try {
// 				isNewPool = await ido_contract_wss_bsc.isNewPool(pool);
// 			} catch (err) {
// 				isNewPool = false;
// 			}
// 			if (!isNewPool) {
// 				const pool_contract = new ethers.Contract(
// 					pool,
// 					pool_abi,
// 					ethers_wss_bsc
// 				);
// 				weiRaised = formatEther(await pool_contract._weiRaised());
// 			} else {
// 				weiRaised = formatEther(await ido_contract_wss_bsc._weiRaised(pool));
// 			}
//
// 			console.log('Log Deposit');
// 			console.log(weiRaised);
// 			const pool_bsc = await Pool_BSC.findOne({ address: pool });
// 			const participants = pool_bsc.participantsAddresses;
// 			pool_bsc.weiRaised = weiRaised;
// 			let isExisted = false;
// 			for (let i = 0; i < participants.length; i++) {
// 				if (participants[i] == newParticipant) {
// 					isExisted = true;
// 					break;
// 				}
// 			}
// 			if (!isExisted) {
// 				participants.push(newParticipant);
// 				pool_bsc.participantsAddresses = participants;
// 			}
// 			await pool_bsc.save();
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	});
//
// 	ido_contract_wss_bsc.on('LogPoolStatusChanged', async (pool, status) => {
// 		io.emit('launchpad:bsc:LogPoolStatusChanged', {
// 			pool,
// 			status,
// 		});
// 		await Pool_BSC.findOneAndUpdate({ address: pool }, { status: status });
// 	});
// 	ido_contract_wss_bsc.on(
// 		'LogUpdateWhitelistable',
// 		async (pool, whitelistable) => {
// 			io.emit('launchpad:bsc:LogUpdateWhitelistable', {
// 				pool,
// 				whitelistable,
// 			});
// 			await Pool_BSC.findOneAndUpdate(
// 				{ address: pool },
// 				{ whitelistable: whitelistable }
// 			);
// 		}
// 	);
//
// 	// ido_contract_wss_bsc.on("LogPoolRemoved", async (pool) => {
// 	//   await Pool_BSC.deleteOne({ address: pool });
// 	// });
//
// 	ido_contract_wss_bsc.on(
// 		'LogAddressWhitelisted',
// 		async (pool_address, whitelistedAddresses) => {
// 			io.emit('launchpad:bsc:LogAddressWhitelisted', {
// 				pool_address,
// 				whitelistedAddresses,
// 			});
// 			const pool = await Pool_BSC.findOne({ address: pool_address });
// 			for (ele of whitelistedAddresses) {
// 				if (!pool.whiteLists.find((ele1) => ele1 == ele)) {
// 					await Pool_BSC.findOneAndUpdate(
// 						{ address: pool_address },
// 						{ $push: { whiteLists: ele } }
// 					);
// 				}
// 			}
// 		}
// 	);
// 	ido_contract_wss_bsc.on(
// 		'LogPoolUnlockVestingToken',
// 		async (_pool, unlockedVestingAmount) => {
// 			io.emit('launchpad:bsc:LogPoolUnlockVestingToken', {
// 				_pool,
// 				unlockedVestingAmount,
// 			});
// 			try {
// 				const pool_bsc = await Pool_BSC.findOne({ address: _pool });
// 				pool_bsc.teamVesting_unlocked_amount = Number(
// 					formatUnits(unlockedVestingAmount, pool_bsc.decimals)
// 				);
// 				await pool_bsc.save();
// 			} catch (err) {
// 				console.log(err);
// 			}
// 		}
// 	);
// 	ido_contract_wss_bsc.on('LogPoolHide', async (_pool, isHide) => {
// 		console.log(_pool);
// 		console.log(isHide);
// 		io.emit('launchpad:bsc:LogPoolHide', {
// 			pool: _pool,
// 			isHide,
// 		});
// 		await Pool_BSC.findOneAndUpdate({ address: _pool }, { is_hide: isHide });
// 	});
// };
// get_IDO_bsc();

// const add_liquidity_lock_bsc = async (
// 	amount,
// 	startDateTime,
// 	endDateTime,
// 	owner,
// 	creator,
// 	liquidity_token_address
// ) => {
// 	const liquidity_contract_wss_bsc = new ethers.Contract(
// 		liquidity_token_address,
// 		pair_abi,
// 		ethers_wss_bsc
// 	);
// 	const dex = await liquidity_contract_wss_bsc.name();
// 	const token0 = await liquidity_contract_wss_bsc.token0();
// 	const token1 = await liquidity_contract_wss_bsc.token1();
// 	const token0_contract_wss_bsc = new ethers.Contract(
// 		token0,
// 		erc20_abi,
// 		ethers_wss_bsc
// 	);
// 	const token1_contract_wss_bsc = new ethers.Contract(
// 		token0,
// 		erc20_abi,
// 		ethers_wss_bsc
// 	);
// 	const token0_name = await token0_contract_wss_bsc.name();
// 	const token1_name = await token1_contract_wss_bsc.name();
// 	const token0_symbol = await token0_contract_wss_bsc.symbol();
// 	const token1_symbol = await token1_contract_wss_bsc.symbol();
// 	const token0_decimals = await token0_contract_wss_bsc.decimals();
// 	let existed = liquidity_locks_bsc.find(
// 		(ele) => ele.owner == owner && ele.token == liquidity_token_address
// 	);
// 	let existed_db = await LiquidityLock_BSC.findOne({
// 		$and: [{ owner }, { token: liquidity_token_address }],
// 	});
// 	if (existed) {
// 		let same_time_existed = existed.amounts.find(
// 			(ele) => ele.endDateTime == endDateTime
// 		);
// 		if (same_time_existed) {
// 			same_time_existed.amount = same_time_existed.amount.add(amount);
// 		} else {
// 			existed.amounts.push({
// 				endDateTime: endDateTime * 1000,
// 				amount,
// 				startDateTime: startDateTime * 1000,
// 			});
// 		}
// 		existed.amount = existed.amount.add(amount);
// 		existed_db.amount = existed.amount;
// 		existed_db.amounts = existed.amounts;
// 		await existed_db.save();
// 	} else {
// 		const liquidity = {
// 			token: liquidity_token_address,
// 			owner,
// 			creator,
// 			amounts: [
// 				{
// 					amount,
// 					endDateTime: endDateTime * 1000,
// 					startDateTime: startDateTime * 1000,
// 				},
// 			],
// 			amount,
// 			token0_name,
// 			token1_name,
// 			token0_decimals,
// 			token0_symbol,
// 			token1_symbol,
// 			dex,
// 			token0,
// 			token1,
// 		};
// 		liquidity_locks_bsc.push(liquidity);
// 		const newLiquidityLock = new LiquidityLock_BSC(liquidity);
// 		await newLiquidityLock.save();
// 	}
// 	return {
// 		token: liquidity_token_address,
// 		owner,
// 		creator,
// 		endDateTime: endDateTime * 1000,
// 		startDateTime: startDateTime * 1000,
// 		amount,
// 		token0_name,
// 		token1_name,
// 		token0_symbol,
// 		token1_symbol,
// 		token0_decimals,
// 		dex,
// 		token0,
// 		token1,
// 	};
// };

// const add_token_lock_bsc = async (
// 	amount,
// 	startDateTime,
// 	endDateTime,
// 	owner,
// 	creator,
// 	token_address
// ) => {
// 	const token_contract_wss_bsc = new ethers.Contract(
// 		token_address,
// 		erc20_abi,
// 		ethers_wss_bsc
// 	);
// 	const name = await token_contract_wss_bsc.name();
// 	const symbol = await token_contract_wss_bsc.symbol();
// 	const decimals = await token_contract_wss_bsc.decimals();
//
// 	let existed = token_locks_bsc.find(
// 		(ele) => ele.owner == owner && ele.token == token_address
// 	);
// 	let existed_db = await TokenLock_BSC.findOne({
// 		$and: [{ owner }, { token: token_address }],
// 	});
// 	if (existed) {
// 		let same_time_existed = existed.amounts.find(
// 			(ele) => ele.endDateTime == endDateTime
// 		);
// 		if (same_time_existed) {
// 			same_time_existed.amount = same_time_existed.amount.add(amount);
// 		} else {
// 			existed.amounts.push({
// 				endDateTime: endDateTime * 1000,
// 				amount,
// 				startDateTime: startDateTime * 1000,
// 			});
// 		}
// 		existed.amount = existed.amount.add(amount);
// 		existed_db.amount = existed.amount;
// 		existed_db.amounts = existed.amounts;
// 		await existed_db.save();
// 	} else {
// 		const token = {
// 			token: token_address,
// 			owner,
// 			creator,
// 			amounts: [
// 				{
// 					amount,
// 					endDateTime: endDateTime * 1000,
// 					startDateTime: startDateTime * 1000,
// 				},
// 			],
// 			amount,
// 			name,
// 			symbol,
// 			decimals,
// 		};
// 		token_locks_bsc.push(token);
// 		const newTokenLock = new TokenLock_BSC(token);
// 		await newTokenLock.save();
// 	}
// 	return {
// 		token: token_address,
// 		owner,
// 		creator,
// 		endDateTime: endDateTime * 1000,
// 		startDateTime: startDateTime * 1000,
// 		amount,
// 		name,
// 		symbol,
// 		decimals,
// 	};
// };

// const add_liquidity_lock_eth = async (
// 	amount,
// 	startDateTime,
// 	endDateTime,
// 	owner,
// 	creator,
// 	liquidity_token_address
// ) => {
// 	const liquidity_contract_wss_eth = new ethers.Contract(
// 		liquidity_token_address,
// 		pair_abi,
// 		ethers_wss_eth
// 	);
// 	const dex = await liquidity_contract_wss_eth.name();
// 	const token0 = await liquidity_contract_wss_eth.token0();
// 	const token1 = await liquidity_contract_wss_eth.token1();
// 	const token0_contract_wss_eth = new ethers.Contract(
// 		token0,
// 		erc20_abi,
// 		ethers_wss_eth
// 	);
// 	const token1_contract_wss_eth = new ethers.Contract(
// 		token0,
// 		erc20_abi,
// 		ethers_wss_eth
// 	);
// 	const token0_name = await token0_contract_wss_eth.name();
// 	const token1_name = await token1_contract_wss_eth.name();
// 	const token0_symbol = await token0_contract_wss_eth.symbol();
// 	const token1_symbol = await token1_contract_wss_eth.symbol();
// 	const token0_decimals = await token0_contract_wss_bsc.decimals();
//
// 	let existed = liquidity_locks_eth.find(
// 		(ele) => ele.owner == owner && ele.token == liquidity_token_address
// 	);
// 	let existed_db = await LiquidityLock_ETH.findOne({
// 		$and: [{ owner }, { token: liquidity_token_address }],
// 	});
// 	if (existed) {
// 		let same_time_existed = existed.amounts.find(
// 			(ele) => ele.endDateTime == endDateTime
// 		);
// 		if (same_time_existed) {
// 			same_time_existed.amount = same_time_existed.amount.add(amount);
// 		} else {
// 			existed.amounts.push({
// 				endDateTime: endDateTime * 1000,
// 				amount,
// 				startDateTime: startDateTime * 1000,
// 			});
// 		}
// 		existed.amount = existed.amount.add(amount);
// 		existed_db.amount = existed.amount;
// 		existed_db.amounts = existed.amounts;
// 		await existed_db.save();
// 	} else {
// 		const liquidity = {
// 			token: liquidity_token_address,
// 			owner,
// 			creator,
// 			amounts: [
// 				{
// 					amount,
// 					endDateTime: endDateTime * 1000,
// 					startDateTime: startDateTime * 1000,
// 				},
// 			],
// 			amount,
// 			token0_name,
// 			token1_name,
// 			token0_symbol,
// 			token1_symbol,
// 			token0_decimals,
// 			dex,
// 			token0,
// 			token1,
// 		};
// 		liquidity_locks_eth.push(liquidity);
// 		const newLiquidityLock = new LiquidityLock_ETH(liquidity);
// 		await newLiquidityLock.save();
// 	}
// 	return {
// 		token: liquidity_token_address,
// 		owner,
// 		creator,
// 		endDateTime: endDateTime * 1000,
// 		startDateTime: startDateTime * 1000,
// 		amount,
// 		token0_name,
// 		token1_name,
// 		token0_symbol,
// 		token1_symbol,
// 		token0_decimals,
// 		dex,
// 		token0,
// 		token1,
// 	};
// };
// const add_token_lock_eth = async (
// 	amount,
// 	startDateTime,
// 	endDateTime,
// 	owner,
// 	creator,
// 	token_address
// ) => {
// 	const token_contract_wss_eth = new ethers.Contract(
// 		token_address,
// 		erc20_abi,
// 		ethers_wss_eth
// 	);
// 	const name = await token_contract_wss_eth.name();
// 	const symbol = await token_contract_wss_eth.symbol();
// 	const decimals = await token_contract_wss_eth.decimals();
// 	let existed = token_locks_eth.find(
// 		(ele) => ele.owner == owner && ele.token == token_address
// 	);
// 	let existed_db = await TokenLock_ETH.findOne({
// 		$and: [{ owner }, { token: token_address }],
// 	});
// 	if (existed) {
// 		let same_time_existed = existed.amounts.find(
// 			(ele) => ele.endDateTime == endDateTime
// 		);
// 		if (same_time_existed) {
// 			same_time_existed.amount = same_time_existed.amount.add(amount);
// 		} else {
// 			existed.amounts.push({
// 				endDateTime: endDateTime * 1000,
// 				amount,
// 				startDateTime: startDateTime * 1000,
// 			});
// 		}
// 		existed.amount = existed.amount.add(amount);
// 		existed_db.amount = existed.amount;
// 		existed_db.amounts = existed.amounts;
// 		await existed_db.save();
// 	} else {
// 		const token = {
// 			token: token_address,
// 			owner,
// 			creator,
// 			amounts: [
// 				{
// 					amount,
// 					endDateTime: endDateTime * 1000,
// 					startDateTime: startDateTime * 1000,
// 				},
// 			],
// 			amount,
// 			name,
// 			symbol,
// 			decimals,
// 		};
// 		try {
// 			token_locks_eth.push(token);
// 			const newTokenLock = new TokenLock_ETH(token);
// 			await newTokenLock.save();
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}
// 	return {
// 		token: token_address,
// 		owner,
// 		creator,
// 		endDateTime: endDateTime * 1000,
// 		startDateTime: startDateTime * 1000,
// 		amount,
// 		name,
// 		symbol,
// 		decimals,
// 	};
// };
// const get_lock_bsc = async () => {
// 	// await LiquidityLock_BSC.deleteMany({});
// 	// await TokenLock_BSC.deleteMany({});
//
// 	let i = 0;
// 	while (true) {
// 		try {
// 			const liquidity_token_address = await lock_contract_wss_bsc.liquidities(
// 				i
// 			);
// 			let k = 0;
// 			while (true) {
// 				try {
// 					const { amount, startDateTime, endDateTime, owner, creator } =
// 						await lock_contract_wss_bsc.liquidityList(liquidity_token_address);
// 					if (amount.gt(0))
// 						await add_liquidity_lock_bsc(
// 							amount,
// 							startDateTime,
// 							endDateTime,
// 							owner,
// 							creator,
// 							liquidity_token_address
// 						);
// 				} catch (error) {
// 					break;
// 				}
// 				k++;
// 			}
// 		} catch (err) {
// 			break;
// 		}
// 		i++;
// 	}
// 	i = 0;
// 	while (true) {
// 		try {
// 			const token_address = await lock_contract_wss_bsc.tokens(i);
// 			let k = 0;
// 			while (true) {
// 				try {
// 					const { amount, startDateTime, endDateTime, owner, creator } =
// 						await lock_contract_wss_bsc.tokenList(token_address, k);
// 					if (amount.gt(0))
// 						await add_token_lock_bsc(
// 							amount,
// 							startDateTime,
// 							endDateTime,
// 							owner,
// 							creator,
// 							token_address
// 						);
// 				} catch (error) {
// 					break;
// 				}
// 				k++;
// 			}
// 		} catch (err) {
// 			break;
// 		}
// 		i++;
// 	}
// 	lock_contract_wss_bsc.on(
// 		'LockAdded',
// 		async (
// 			_token,
// 			_endDateTime,
// 			_amount,
// 			_owner,
// 			_isLiquidity,
// 			creator,
// 			_startDateTime
// 		) => {
// 			let data;
//
// 			if (_isLiquidity) {
// 				if (_amount.gt(0)) {
// 					data = await add_liquidity_lock_bsc(
// 						_amount,
// 						_startDateTime,
// 						_endDateTime,
// 						_owner,
// 						creator,
// 						_token
// 					);
// 					io.emit('lock:bsc:LiquidityLockAdded', data);
// 				}
// 			} else {
// 				if (_amount.gt(0)) {
// 					data = await add_token_lock_bsc(
// 						_amount,
// 						_startDateTime,
// 						_endDateTime,
// 						_owner,
// 						creator,
// 						_token
// 					);
// 					io.emit('lock:bsc:TokenLockAdded', data);
// 				}
// 			}
// 		}
// 	);
// 	lock_contract_wss_bsc.on(
// 		'UnlockLiquidity',
// 		async (_token, _endDateTime, _amount, _owner) => {
// 			_endDateTime = _endDateTime * 1000;
// 			io.emit('lock:bsc:UnlockLiquidity', {
// 				token: _token,
// 				endDateTime: _endDateTime,
// 				amount: _amount,
// 				owner: _owner,
// 			});
// 			const index = liquidity_locks_bsc.findIndex(
// 				(ele) =>
// 					ele.token == _token &&
// 					ele.endDateTime == _endDateTime &&
// 					ele.owner == _owner
// 			);
// 			if (index > -1 && _amount.gt(0)) {
// 				liquidity_locks_bsc[index].amounts.splice(
// 					liquidity_locks_bsc[index].amounts.findIndex(
// 						(ele) => ele.endDateTime == _endDateTime
// 					),
// 					1
// 				);
// 				liquidity_locks_bsc[index].amount =
// 					liquidity_locks_bsc[index].amount.sub(_amount);
// 				if (liquidity_locks_bsc[index].amount.lte(0)) {
// 					liquidity_locks_bsc.splice(index, 1);
// 					await LiquidityLock_BSC.deleteOne({ token: _token, owner: _owner });
// 				} else {
// 					const token_lock_db = await LiquidityLock_BSC.findOne({
// 						token: _token,
// 						owner: _owner,
// 					});
// 					token_lock_db.amounts = liquidity_locks_bsc[index].amounts;
// 					token_lock_db.amount = liquidity_locks_bsc[index].amount;
// 					await token_lock_db.save();
// 				}
// 			}
// 		}
// 	);
// 	lock_contract_wss_bsc.on(
// 		'UnlockToken',
// 		async (_token, _endDateTime, _amount, _owner) => {
// 			_endDateTime = _endDateTime * 1000;
// 			console.log(_amount);
// 			io.emit('lock:bsc:UnlockToken', {
// 				token: _token,
// 				endDateTime: _endDateTime,
// 				amount: _amount,
// 				owner: _owner,
// 			});
// 			const index = token_locks_bsc.findIndex(
// 				(ele) => ele.token == _token && ele.owner == _owner
// 			);
// 			if (index > -1 && _amount.gt(0)) {
// 				token_locks_bsc[index].amounts.splice(
// 					token_locks_bsc[index].amounts.findIndex(
// 						(ele) => ele.endDateTime == _endDateTime
// 					),
// 					1
// 				);
// 				token_locks_bsc[index].amount =
// 					token_locks_bsc[index].amount.sub(_amount);
// 				if (token_locks_bsc[index].amount.lte(0)) {
// 					token_locks_bsc.splice(index, 1);
// 					await TokenLock_BSC.deleteOne({ token: _token, owner: _owner });
// 				} else {
// 					const token_lock_db = await TokenLock_BSC.findOne({
// 						token: _token,
// 						owner: _owner,
// 					});
// 					token_lock_db.amounts = token_locks_bsc[index].amounts;
// 					token_lock_db.amount = token_locks_bsc[index].amount;
// 					await token_lock_db.save();
// 				}
// 			}
// 		}
// 	);
// };

// const get_lock_eth = async () => {
// 	// await LiquidityLock_ETH.deleteMany({});
// 	// await TokenLock_ETH.deleteMany({});
//
// 	let i = 0;
// 	while (true) {
// 		try {
// 			const liquidity_token_address = await lock_contract_wss_eth.liquidities(
// 				i
// 			);
// 			let k = 0;
// 			while (true) {
// 				try {
// 					const { amount, startDateTime, endDateTime, owner, creator } =
// 						await lock_contract_wss_eth.liquidityList(
// 							liquidity_token_address,
// 							k
// 						);
//
// 					if (amount.gt(0))
// 						await add_liquidity_lock_eth(
// 							amount,
// 							startDateTime,
// 							endDateTime,
// 							owner,
// 							creator,
// 							liquidity_token_address
// 						);
// 				} catch (error) {
// 					break;
// 				}
// 				k++;
// 			}
// 		} catch (err) {
// 			break;
// 		}
// 		i++;
// 	}
// 	i = 0;
// 	while (true) {
// 		try {
// 			const token_address = await lock_contract_wss_eth.tokens(i);
// 			let k = 0;
// 			while (true) {
// 				try {
// 					let { amount, startDateTime, endDateTime, owner, creator } =
// 						await lock_contract_wss_eth.tokenList(token_address, k);
// 					if (amount.gt(0))
// 						await add_token_lock_eth(
// 							amount,
// 							startDateTime,
// 							endDateTime,
// 							owner,
// 							creator,
// 							token_address
// 						);
// 				} catch (error) {
// 					break;
// 				}
// 				k++;
// 			}
// 		} catch (err) {
// 			break;
// 		}
// 		i++;
// 	}
// 	lock_contract_wss_eth.on(
// 		'LockAdded',
// 		async (
// 			_token,
// 			_endDateTime,
// 			_amount,
// 			_owner,
// 			_isLiquidity,
// 			creator,
// 			_startDateTime
// 		) => {
// 			let data;
// 			if (_isLiquidity) {
// 				if (_amount.gt(0)) {
// 					data = await add_liquidity_lock_eth(
// 						_amount,
// 						_startDateTime,
// 						_endDateTime,
// 						_owner,
// 						creator,
// 						_token
// 					);
// 					io.emit('lock:eth:LiquidityLockAdded', data);
// 				}
// 			} else {
// 				if (_amount.gt(0)) {
// 					data = await add_token_lock_eth(
// 						_amount,
// 						_startDateTime,
// 						_endDateTime,
// 						_owner,
// 						creator,
// 						_token
// 					);
// 					io.emit('lock:eth:TokenLockAdded', data);
// 				}
// 			}
// 		}
// 	);
// 	lock_contract_wss_eth.on(
// 		'UnlockLiquidity',
// 		async (_token, _endDateTime, _amount, _owner) => {
// 			_endDateTime = _endDateTime * 1000;
// 			io.emit('lock:eth:UnlockLiquidity', {
// 				token: _token,
// 				endDateTime: _endDateTime,
// 				amount: _amount,
// 				owner: _owner,
// 			});
// 			const index = liquidity_locks_eth.findIndex(
// 				(ele) =>
// 					ele.token == _token &&
// 					ele.endDateTime == _endDateTime &&
// 					ele.owner == _owner
// 			);
// 			if (index > -1 && _amount.gt(0)) {
// 				liquidity_locks_eth[index].amounts.splice(
// 					liquidity_locks_eth[index].amounts.findIndex(
// 						(ele) => ele.endDateTime == _endDateTime
// 					),
// 					1
// 				);
// 				liquidity_locks_eth[index].amount =
// 					liquidity_locks_eth[index].amount.sub(_amount);
// 				if (liquidity_locks_eth[index].amount.lte(0)) {
// 					liquidity_locks_eth.splice(index, 1);
// 					await LiquidityLock_ETH.deleteOne({ token: _token, owner: _owner });
// 				} else {
// 					const token_lock_db = await LiquidityLock_ETH.findOne({
// 						token: _token,
// 						owner: _owner,
// 					});
// 					token_lock_db.amounts = liquidity_locks_eth[index].amounts;
// 					token_lock_db.amount = liquidity_locks_eth[index].amount;
// 					await token_lock_db.save();
// 				}
// 			}
// 		}
// 	);
// 	lock_contract_wss_eth.on(
// 		'UnlockToken',
// 		async (_token, _endDateTime, _amount, _owner) => {
// 			_endDateTime = _endDateTime * 1000;
// 			io.emit('lock:eth:UnlockToken', {
// 				token: _token,
// 				endDateTime: _endDateTime,
// 				amount: _amount,
// 				owner: _owner,
// 			});
// 			const index = token_locks_eth.findIndex(
// 				(ele) => ele.token == _token && ele.owner == _owner
// 			);
// 			if (index > -1 && _amount.gt(0)) {
// 				token_locks_eth[index].amounts.splice(
// 					token_locks_eth[index].amounts.findIndex(
// 						(ele) => ele.endDateTime == _endDateTime
// 					),
// 					1
// 				);
// 				token_locks_eth[index].amount =
// 					token_locks_eth[index].amount.sub(_amount);
// 				if (token_locks_eth[index].amount.lte(0)) {
// 					token_locks_eth.splice(index, 1);
// 					await TokenLock_ETH.deleteOne({ token: _token, owner: _owner });
// 				} else {
// 					const token_lock_db = await TokenLock_ETH.findOne({
// 						token: _token,
// 						owner: _owner,
// 					});
// 					token_lock_db.amounts = token_locks_eth[index].amounts;
// 					token_lock_db.amount = token_locks_eth[index].amount;
// 					await token_lock_db.save();
// 				}
// 			}
// 		}
// 	);
// };
// get_lock_bsc();
// get_lock_eth();
