const Pool_BSC = require("../models/Pool_BSC");
const StakingPool = require("../models/StakingPool");
const LiquidityLock_BSC = require("../models/LiquidityLock_BSC");
const TokenLock_BSC = require("../models/TokenLock_BSC");
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
    "mailto:goldendev726@gmail.com",
    "BPBcNP9ZuD5Dk-IeFA8Uz5Sbemi3S2NjLDKW_iedPu7rASN1ZpNuL9Pin3iDSdU--kpAgyzUL4qATc0xFQajpDg",
    "s44ya4zuG8byJVVqqxpVGvDyWZ34GIbT4P0-VYzkskg"
);
let subscription;
exports.webPush = async (req, res) => {
    subscription = req.body;
    console.log(subscription);
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
    const { poolOwner, model, details, vesting, poolPercentFee, poolAddress, descriptions, logo,
        projectName, poster, category, blockchain, tgi, type,
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

    console.log(req.body)

    try {
        let ipfs = {};
        const weiRaised = 0;
        let hardCap = model[0]
        let softCap = model[1]
        let presaleRate = model[2]
        let dexCapPercent = model[3]
        let dexRate = model[4]
        let projectTokenAddress = model[6]
        let status = "online" // not found
        let tier = model[5]
        let kyc = false // not found

        console.log("projectTokenAddress", projectTokenAddress)


        let startDateTime = details[0]
        let endDateTime = details[1]
        let listDateTime = details[2]
        let minAllocationPerUser = details[3]
        let maxAllocationPerUser = details[4]
        let dexLockup = details[5]
        let extraData = details[7]
        // refund=details[0]
        let whitelistable = details[6]
        let audit = false
        let auditLink = "auditLink"


        startDateTime = startDateTime * 1000;
        endDateTime = endDateTime * 1000;
        listDateTime = listDateTime * 1000;
        // const erc20_contract = new ethers.Contract(
        //     projectTokenAddress,
        //     erc20_abi,
        //     ethers_wss_bsc
        // );

        hardCap = formatEther(hardCap);
        softCap = formatEther(softCap);

        // const decimals = await erc20_contract.decimals();
        const decimals = 18;
        console.log("decimals", decimals)

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
        minAllocationPerUser = formatEther(minAllocationPerUser);
        maxAllocationPerUser = formatEther(maxAllocationPerUser);
        // const symbol = await erc20_contract.symbol();
        const symbol = 'BUSD';
        // const name = await erc20_contract.name();
        const name = 'BUSD';
        console.log("createBSCIDO symbol", symbol)
        const whiteLists = [],
            participantsAddresses = [];

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
            projectName,
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