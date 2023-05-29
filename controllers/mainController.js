const Test = require("../models/Test");
const Pool_BSC = require("../models/Pool_BSC");
const StakingPool = require("../models/StakingPool");
const LiquidityLock_BSC = require("../models/LiquidityLock_BSC");
const TokenLock_BSC = require("../models/TokenLock_BSC");
const PoolApproving = require("../models/Pool_Approving");
const UserStakings = require("../models/UserStakings");
const UserInfo = require("../models/UserInfo");
const UserDealStatus = require("../models/UserDealStatus");
const Vote = require("../models/Vote");
const Card = require("../models/Card");
const webpush = require("web-push");
const ethers = require("ethers");
const erc20_abi = require("../abi/erc20.json");
const { formatEther, formatUnits } = require("@ethersproject/units");
const axios = require("axios");
require("dotenv").config();

const node = "https://data-seed-prebsc-1-s1.binance.org:8545";

const ethers_wss_bsc = new ethers.providers.JsonRpcProvider(
    node
);

webpush.setVapidDetails(
    "mailto:webdev181011@gmail.com",
    "BPBcNP9ZuD5Dk-IeFA8Uz5Sbemi3S2NjLDKW_iedPu7rASN1ZpNuL9Pin3iDSdU--kpAgyzUL4qATc0xFQajpDg",
    "s44ya4zuG8byJVVqqxpVGvDyWZ34GIbT4P0-VYzkskg"
);
let subscription;
exports.webPush = async (req, res) => {
    subscription = req.body;
    console.log(subscription);
};
exports.ping = async (req, res) => {
    res.json({
        type: 'pong',
        message: "Shardstarter v1.0",
    });
};
exports.temp = async (req, res) => {
    try {
        await new Test({ title: 'ttt', content: 'ccc' }).save();
        return res.json({
            result: true, message: 'done'
        });
    } catch (e) {
        return res.json({
            result: false, message: e.message
        });
    }

};
//staking
exports.getStake = async (req, res) => {
    const items = await StakingPool.find({});
    res.json({
        data: items,
        message: "success",
    });
};
exports.createStake = async (req, res) => {
    await StakingPool(req.body).save();
    res.json("done");
};
exports.updateUserStaking = async (req, res) => {
    try {
        const { staking_address, wallet_address, changing_amount } = req.body;
        let existing = await UserStakings.findOne({ staking_address, wallet_address });

        if (existing) {
            let current_staked = existing.staked_amount || 0;
            let new_staked = current_staked + changing_amount;

            existing.staked_amount = new_staked;
            await existing.save();

            return res.json({ result: true, data: 'done' })
        } else {
            await new UserStakings({ staking_address, wallet_address, staked_amount: changing_amount }).save();
            return res.json({ result: true, data: 'done' })
        }
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};
exports.getCountForTierLevel = async (req, res) => {
    try {
        const { staking_address } = req.body;
        var level1_amount = 1000;
        var level2_amount = 2000;
        var level3_amount = 3000;
        var level4_amount = 4000;

        let level0 = await UserStakings.countDocuments({ staking_address, staked_amount: { $lt: level1_amount } });
        let level1 = await UserStakings.countDocuments({ staking_address, staked_amount: { $gte: level1_amount, $lt: level2_amount } });
        let level2 = await UserStakings.countDocuments({ staking_address, staked_amount: { $gte: level2_amount, $lt: level3_amount } });
        let level3 = await UserStakings.countDocuments({ staking_address, staked_amount: { $gte: level3_amount, $lt: level4_amount } });
        let level4 = await UserStakings.countDocuments({ staking_address, staked_amount: { $gte: level4_amount } });

        return res.json({ result: true, data: [level0, level1, level2, level3, level4], message: 'count of each tier level' })

    } catch (error) {
        return res.json({ result: false, message: error.message })
    }

};





exports.getIDO = async (req, res) => {
    const pushMessageData = {
        title: `Get IDO Notification`,
        body: "This is test IDO Notification!",
        // image: nft.image,
    };

    // setTimeout(() => {
    //   if (subscription) {
    //     console.log("Notification!")
    //     webpush.sendNotification(subscription, JSON.stringify(pushMessageData));
    //   }
    // }, 5000)
    const search = req.query.search;
    const page = req.query.page || 1;
    const tab = req.query.tab || 0;
    const filter = req.query.filter || -1;
    const sort = req.query.sort || 0;
    const limit = req.query.limit || 50
    const skip = req.query.skip || page > 0 ? (page - 1) * limit : 0

    let pools;
    let findState = {},
        searchState = {},
        filterState = {},
        tabState = {};
    if (search) {
        searchState = {
            $or: [
                {
                    projectTokenAddress: { $regex: search, $options: "i" },
                },
                {
                    name: { $regex: search, $options: "i" },
                },
                {
                    symbol: { $regex: search, $options: "i" },
                },
            ],
        };
    }
    if (tab == 1) {
        tabState = { participantsAddresses: req.query.account };
    } else if (tab == 3) {
        tabState = { owner: req.query.account };
    }
    if (filter == 0) {
        //upcoming
        filterState = {
            $and: [{ status: filter }, { startDateTime: { $gt: Date.now() } }],
        };
    } else if (filter == 1) {
        //live
        filterState = {
            $and: [
                { status: "0" },
                { startDateTime: { $lte: Date.now() } },
                { endDateTime: { $gt: Date.now() } },
                { $expr: { $lt: ["$weiRaised", "$hardCap"] } },
            ],
        };
    } else if (filter == 2) {
        //ended
        filterState = {
            $and: [
                { status: "0" },
                { endDateTime: { $lte: Date.now() } },
                { listDateTime: { $gt: Date.now() - 86400 * 21 * 1000 } },
                { $expr: { $gte: ["$weiRaised", "$softCap"] } },
            ],
        };
    } else if (filter == 3) {
        //finished
        filterState = {
            $and: [
                { status: "0" },
                { listDateTime: { $gt: Date.now() - 86400 * 21 * 1000 } },
                { $expr: { $eq: ["$weiRaised", "$hardCap"] } },
            ],
        };
    } else if (filter == 4) {
        //failed
        filterState = {
            $and: [
                { status: "0" },
                { endDateTime: { $lte: Date.now() } },
                { $expr: { $lt: ["$weiRaised", "$softCap"] } },
            ],
        };
    } else if (filter == 5) {
        //Listed on dex
        filterState = { status: "1" };
    } else if (filter == 6) {
        //Cancelled
        filterState = {
            $or: [
                { status: "2" },
                {
                    $and: [
                        { status: "0" },
                        { listDateTime: { $lte: Date.now() - 86400 * 21 * 1000 } },
                        { $expr: { $gte: ["$weiRaised", "$softCap"] } },
                    ],
                },
            ],
        };
    } else if (filter == 7) {
        filterState = { kyc: true };
    } else if (filter == 8) {
        filterState = { audit: true };
    } else if (filter == 9) {
        filterState = { tier: "1" };
    } else if (filter == 10) {
        filterState = { tier: "2" };
    } else if (filter == 11) {
        filterState = { tier: "3" };
    } else if (filter == 12) {
        filterState = { whitelistable: true }
    } else if (filter == 13) {
        filterState = { whitelistable: false }
    }
    findState = {
        $and: [searchState, filterState, tabState],
    };
    pools = await Pool_BSC.find(findState)
        .sort({ [sort]: -1 })
        .skip(skip)
        .limit(limit);
    let counts = await Pool_BSC.find(findState).sort(sort).countDocuments();

    counts = Math.ceil(counts / 50);
    res.json({ pools, counts });
};

exports.getPool = async (req, res) => {
    let pool = await Pool_BSC.findOne({
        address: req.params.address,
    });

    res.json({ pool });
};

exports.getLiquidities = async (req, res) => {
    const search = req.query.search;
    const page = req.query.page || 1;
    const tab = req.query.tab || 0;
    const limit = req.query.limit || 50;
    const skip = req.query.skip || page > 0 ? (page - 1) * limit : 0;

    let liquidities;
    let findState = {},
        tabState = {},
        searchState = {};
    if (search) {
        searchState = {
            token: search,
        };
    }
    if (tab == 1) {
        tabState = { owner: req.query.account };
    }

    findState = {
        $and: [searchState, tabState],
    };
    liquidities = await LiquidityLock_BSC.find(findState, {
        token0_name: 1,
        token1_name: 1,
        token0_symbol: 1,
        token1_symbol: 1,
        amount: 1,
        token: 1,
        owner: 1,
        token0: 1,
        token1: 1,
    })
        .skip(skip)
        .limit(limit);
    let counts = await LiquidityLock_BSC.find(findState).countDocuments();

    counts = Math.ceil(counts / 50);
    res.json({ liquidities, counts });
};

exports.getTokens = async (req, res) => {
    const search = req.query.search;
    const page = req.query.page || 1;
    const tab = req.query.tab || 0;
    const limit = req.query.limit || 50;
    const skip = req.query.skip || page > 0 ? (page - 1) * limit : 0;

    let tokens;
    let findState = {},
        tabState = {},
        searchState = {};
    if (search) {
        searchState = {
            token: search,
        };
    }
    if (tab == 1) {
        tabState = { owner: req.query.account };
    }

    findState = {
        $and: [searchState, tabState],
    };
    tokens = await TokenLock_BSC.find(findState, {
        name: 1,
        symbol: 1,
        amount: 1,
        token: 1,
        owner: 1,
        decimals: 1,
    })
        .skip(skip)
        .limit(limit);
    let counts = await TokenLock_BSC.find(findState).countDocuments();

    counts = Math.ceil(counts / 50);
    res.json({ tokens, counts });
};

exports.getLiquidity = async (req, res) => {
    let liquidity = await LiquidityLock_BSC.findOne({
        $and: [{ token: req.params.token }, { owner: req.params.owner }],
    });

    res.json({ liquidity });
};

exports.getToken = async (req, res) => {
    let token = await TokenLock_BSC.findOne({
        $and: [{ token: req.params.token }, { owner: req.params.owner }],
    });

    res.json({ token });
};


exports.createBSCIDO = async (req, res) => {
    const { poolOwner, model, vesting, poolPercentFee, poolAddress, descriptions, logo,
        projectName, deal, poster, category, blockchain, tgi, type,
        whitelistAddresses, whitelistMaxDeposit,
        startDateTime, endDateTime, fcfsStartDateTime, fcfsEndDateTime, listDateTime,
        minAllocationPerUser, maxAllocationPerUser, whitelistable, extraData, projectTokenAddress, dexLockup
    } = req.body;
    const {
        description,
        roadmap_description,
        roadmap_url,
        about_description,
        about_url,
        features_description,
        features_url,
        teams_description,
        teams_url,
        tokenomics_description,
        tokenomics_url,
        twitter_followers
    } = descriptions;

    try {
        let ipfs = {};
        const weiRaised = 0;
        let hardCap = model[0]
        let softCap = model[1]
        let presaleRate = model[2]
        let dexCapPercent = model[3]
        let dexRate = model[4]
        let status = "online" // not found
        let tier = model[5]
        let kyc = false // not found

        let audit = false
        let auditLink = "auditLink"


        // const erc20_contract = new ethers.Contract(
        //     projectTokenAddress,
        //     erc20_abi,
        //     ethers_wss_bsc
        // );

        hardCap = formatEther(hardCap);
        softCap = formatEther(softCap);

        // const decimals = await erc20_contract.decimals();
        const decimals = 18;

        // const totalSupply = formatUnits(await erc20_contract.totalSupply(), decimals);
        const totalSupply = 0;

        let vestingAmount = vesting[0];
        let unlockedVestingAmount = vesting[1];
        let firstPercent = vesting[2];
        let firstPeriod = vesting[3];
        let eachPercent = vesting[4];
        let eachPeriod = vesting[5];

        vestingAmount = formatUnits(vestingAmount, decimals);
        unlockedVestingAmount = formatUnits(unlockedVestingAmount, decimals);
        presaleRate = formatUnits(presaleRate, decimals);
        dexRate = formatUnits(dexRate, decimals);


        // const symbol = await erc20_contract.symbol();
        const symbol = 'BUSD';
        // const name = await erc20_contract.name();
        const name = 'BUSD';

        const participantsAddresses = [];
        const whiteLists = whitelistAddresses.split(/\r?\n/).filter(Boolean);

        try {
            let response_ipfs;
            response_ipfs = await axios.get(`https://ipfs.io/ipfs/${extraData}`);
            ipfs = response_ipfs.data;
            console.log("IPFS", ipfs)
        } catch (error) {
            console.log(error);
        }
        const pool = {
            address: poolAddress,
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
            startDateTime, endDateTime, fcfsStartDateTime, fcfsEndDateTime, listDateTime,
            minAllocationPerUser, maxAllocationPerUser,
            dexLockup,
            extraData,
            ipfs,
            // refund,
            whitelistable,
            decimals,
            whiteLists,
            whitelistMaxDeposit,
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
            description,
            roadmap_description,
            roadmap_url,
            about_description,
            about_url,
            features_description,
            features_url,
            teams_description,
            teams_url,
            tokenomics_description,
            tokenomics_url,
            twitter_followers,
            logo,
            projectName, deal,
            poster,
            category, blockchain, tgi, type,
        };
        console.log("createBSCIDO pool", pool)
        if (pool != null) {
            const newPool = new Pool_BSC(pool);
            let result = await newPool.save();
            res.json({ result });
            console.log("createBSCIDO newPool", result)
        } else {
            console.log("createBSCIDO newPool done else")
        }
    } catch (err) {
        console.log("createBSCIDO err", err)
        return null;
    }
}

exports.updateIDOWeiRaised = async (req, res) => {
    try {
        const { address, weiRaised } = req.body;
        console.log(req.body)
        let pool = await Pool_BSC.findOne({ address })
        console.log(pool)
        pool.weiRaised = weiRaised;
        await pool.save();
        return res.json({ result: true, data: 'done' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}

exports.updateUserDeposit = async (req, res) => {
    try {
        const { pool_address, wallet_address, amount } = req.body;

        let existing = await UserDealStatus.findOne({ pool_address, wallet_address })
        if (existing) {
            existing.deposit_amount = Number(existing.deposit_amount) + Number(amount);
            await existing.save();
            return res.json({ result: true, data: 'done' })
        } else {
            await new UserDealStatus({ pool_address, wallet_address, deposit_amount: amount }).save();
            return res.json({ result: true, data: 'done' })
        }
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
}


exports.setApproval = async (req, res) => {
    try {
        var { pool_address, user_address } = req.body
        var record = await PoolApproving.findOne({
            pool_address,
            user_address
        });

        if (!record)
            await PoolApproving.create({
                pool_address,
                user_address
            });
        return res.json({ result: true, data: 'done' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};


exports.getApproval = async (req, res) => {
    try {
        var { pool_address, user_address } = req.body
        var record = await PoolApproving.findOne({
            pool_address,
            user_address
        });
        if (record)
            return res.json({ result: true, data: true, message: 'User approved' })
        else
            return res.json({ result: true, data: false, message: 'User did not approve' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};

exports.countApproval = async (req, res) => {
    try {
        var { pool_address } = req.body
        var count = await PoolApproving.countDocuments({
            pool_address,
        });
        return res.json({ result: true, data: count, message: 'Number of approval for this pool' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};

exports.deleteIDO = async (req, res) => {
    try {
        var { pool_address } = req.body
        await Pool_BSC.deleteMany({
            address: pool_address,
        });
        return res.json({ result: true, data: 'success', message: 'pool removed' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};

/** User info */
exports.getUserInfo = async (req, res) => {
    try {
        var { wallet_address } = req.body
        let existing = await UserInfo.findOne({ wallet_address })
        return res.json({ result: true, data: existing, message: 'Number of approval for this pool' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};
exports.setUserEmail = async (req, res) => {
    try {
        var { wallet_address, email } = req.body

        if (!wallet_address) return res.json({ result: false, message: 'Wallet address is required.' })
        let existing = await UserInfo.findOne({ wallet_address })
        if (existing) {
            existing.email = email;
            await existing.save();
            return res.json({ result: true, data: 'done' })
        } else {
            await new UserInfo({ wallet_address, email }).save();
            return res.json({ result: true, data: 'done' })
        }

    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};
exports.setUserNonEVM = async (req, res) => {
    try {
        var { wallet_address, nonevm } = req.body

        if (!wallet_address) return res.json({ result: false, message: 'Wallet address is required.' })
        let existing = await UserInfo.findOne({ wallet_address })
        if (existing) {
            existing.nonevm = nonevm;
            await existing.save();
            return res.json({ result: true, data: 'done' })
        } else {
            await new UserInfo({ wallet_address, email }).save();
            return res.json({ result: true, data: 'done' })
        }

    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};
exports.getUserParticipations = async (req, res) => {
    try {
        var { wallet_address } = req.body
        let rows = await UserDealStatus.find({ wallet_address }).lean();

        await rows.reduce(async (accum, row, key) => {
            await accum;

            let pool = await Pool_BSC.findOne({ address: row.pool_address })
            if (pool) {
                row.projectName = pool.projectName;
                row.deal = pool.deal;
                row.logo = pool.logo;
                row.presaleRate = pool.presaleRate;
            }

            return 1;
        }, Promise.resolve(''));

        return res.json({ result: true, data: rows })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};


/** Vote */
exports.createVote = async (req, res) => {
    try {
        var { projectName, logo, ticker, website, telegram, twitter, discord,
            whitepaper, pitchdeck, audit } = req.body

        await Vote.create({
            projectName, logo, ticker, website, telegram, twitter, discord, whitepaper, pitchdeck, audit
        });
        return res.json({ result: true, data: 'done' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};

exports.getVotes = async (req, res) => {
    try {
        var { } = req.body
        var records = await Vote.find({});
        return res.json({ result: true, data: records, })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};

exports.placeVote = async (req, res) => {
    try {
        var { vote_id, wallet_address, power, isUp } = req.body
        var record = await Vote.findOne({ _id: vote_id });
        if (!record) return res.json({ result: false, message: 'No vote' })

        let participants = record.participants;
        participants.push({ wallet_address, power, isUp });
        if (isUp)
            record.up += power;
        else
            record.down += power;

        await record.save();

        return res.json({ result: true, data: 'done', })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};


/** Cards */
exports.createCards = async (req, res) => {
    try {
        var { cards } = req.body
        await Card.deleteMany({});
        const promises = cards.map(async (card) => {
            const result = await Card.create(card);
            return result;
        });
        const results = await Promise.all(promises)
        console.log(results);

        return res.json({ result: true, data: 'done' })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};

exports.getCards = async (req, res) => {
    try {
        var { } = req.body
        var records = await Card.find({});
        return res.json({ result: true, data: records, })
    } catch (error) {
        return res.json({ result: false, message: error.message })
    }
};