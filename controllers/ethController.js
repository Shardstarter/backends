const Pool_ETH = require("../models/Pool_ETH");
const LiquidityLock_ETH = require("../models/LiquidityLock_ETH");
const TokenLock_ETH = require("../models/TokenLock_ETH");
const { BigNumber } = require("ethers");
const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:goldendev726@gmail.com",
  "BPBcNP9ZuD5Dk-IeFA8Uz5Sbemi3S2NjLDKW_iedPu7rASN1ZpNuL9Pin3iDSdU--kpAgyzUL4qATc0xFQajpDg",
  "s44ya4zuG8byJVVqqxpVGvDyWZ34GIbT4P0-VYzkskg"
);
let subscription;
exports.webPush = async (req, res) => {
  subscription=req.body;
};


exports.getIDO = async (req, res) => {
    // setTimeout(() => {
  // if (subscription) {
  //   const pushMessageData = {
  //     title: 'presale' ? ` presale is going to start soon!` : ` dex listing is going to be done soon!`,
  //     body: "Starts in  minutes on network!",
  //     address:'0x422a3766d927f81B513225d94Ef535e8905192b4'
  //   };
  //   webpush.sendNotification(subscription, JSON.stringify(pushMessageData));

    
  // }
  // }, 3000)
  const search = req.query.search;
  const page = req.query.page || 1;
  const tab = req.query.tab || 0;
  const filter = req.query.filter || -1;
  const sort = req.query.sort || 0;
  const limit = req.query.limit || 50;
  const skip = req.query.skip || page > 0 ? (page - 1) * limit : 0;

  let pools;
  let findState = {}, searchState = {}, filterState = {}, tabState = {};
  if (search) {
    searchState = {
      $or: [{
        projectTokenAddress: { $regex: search, $options: 'i' }
      }, {
        name: { $regex: search, $options: 'i' }
      }, {
        symbol: { $regex: search, $options: 'i' }
      }]
    };
  }
  if (tab == 1) {
    tabState = { participantsAddresses: req.query.account };
    
  } else if (tab == 3) {
    tabState = { owner: req.query.account };
  }


  if (filter == 0) {
    //upcoming
    filterState = { '$and': [{ status: filter }, { startDateTime: { $gt: Date.now() } }] };
  } else if (filter == 1) {
    //live
    filterState = {
      '$and': [{ status: '0' }, { startDateTime: { $lte: Date.now() } }, { endDateTime: { $gt: Date.now() } },
      { "$expr": { "$lt": ["$weiRaised", "$hardCap"] } }]
    };
  } else if (filter == 2) {
    //ended
    filterState = {
      '$and': [{ status: '0' }, { endDateTime: { $lte: Date.now() } }, { listDateTime: { $gt: Date.now() - 86400 * 21 * 1000 } },
      { "$expr": { "$gte": ["$weiRaised", "$softCap"] } }]
    };
  } else if (filter == 3) {
    //finished
    filterState = {
      '$and': [{ status: '0' }, { listDateTime: { $gt: Date.now() - 86400 * 21 * 1000 } },
      { "$expr": { "$eq": ["$weiRaised", "$hardCap"] } }]
    };
  } else if (filter == 4) {
    //failed
    filterState = {
      '$and': [{ status: '0' }, { endDateTime: { $lte: Date.now() } },
      { "$expr": { "$lt": ["$weiRaised", "$softCap"] } }]
    };
  } else if (filter == 5) {
    //Listed on dex
    filterState = { status: '1' };
  } else if (filter == 6) {
    //Cancelled
    filterState = {
      '$or': [{ status: '2' }, {
        '$and': [{ status: '0' }, { listDateTime: { $lte: Date.now() - 86400 * 21 * 1000 } },
        { "$expr": { "$gte": ["$weiRaised", "$softCap"] } }]
      }]
    };
  } else if (filter == 7) {
    filterState = { kyc: true };
  } else if (filter == 8) {
    filterState = { audit: true };
  } else if (filter == 9) {
    filterState = { tier: '1' };
  } else if (filter == 10) {
    filterState = { tier: '2' };
  } else if (filter == 11) {
    filterState = { tier: '3' };
  }

  findState = {
    $and: [searchState, filterState, tabState]
  };
  pools = await Pool_ETH.find(findState)
  .sort({[sort]:-1}).skip(skip).limit(limit);
  let counts = await Pool_ETH.find(findState)
    .sort(sort).countDocuments();

  counts = Math.ceil(counts / 50);
  res.json({ pools, counts });
};

exports.getPool = async (req, res) => {
  let pool = await Pool_ETH.findOne({
    address: req.params.address
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
  let findState = {}, tabState = {}, searchState = {};
  if (search) {
    searchState = {
      token: search
    };
  }
  if (tab == 1) {
    tabState = { owner: req.query.account };
  }

  findState = {
    $and: [searchState, tabState]
  };
  liquidities = await LiquidityLock_ETH.find(findState, { token0_name: 1, token1_name: 1, token0_symbol: 1, token1_symbol: 1, amount: 1, token: 1, owner: 1, token0: 1, token1: 1 }).skip(skip).limit(limit);
  let counts = await LiquidityLock_ETH.find(findState).countDocuments();

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
  let findState = {}, tabState = {}, searchState = {};
  if (search) {
    searchState = {
      token: search
    };
  }
  if (tab == 1) {
    tabState = { owner: req.query.account };
  }

  findState = {
    $and: [searchState, tabState]
  };

  tokens = await TokenLock_ETH.find(findState, { name: 1, symbol: 1, amount: 1, token: 1, owner: 1, decimals: 1 }).skip(skip).limit(limit);
  let counts = await TokenLock_ETH.find(findState).countDocuments();

  counts = Math.ceil(counts / 50);
  res.json({ tokens, counts });
};

exports.getLiquidity = async (req, res) => {

  let liquidity = await LiquidityLock_ETH.findOne({
    $and: [{ token: req.params.token }, { owner: req.params.owner }]
  });


  res.json({ liquidity });
};

exports.getToken = async (req, res) => {

  let token = await TokenLock_ETH.findOne({
    $and: [{ token: req.params.token }, { owner: req.params.owner }]
  });


  res.json({ token });
};