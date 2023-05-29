const express = require("express");
const router = express.Router();

const ethController = require("./controllers/ethController");
const mainController = require("./controllers/mainController");
const twitterController = require("./controllers/twitterController");

router.get("/get-followers/:username", twitterController.getFollowers);

router.get("/eth/ido", ethController.getIDO);
router.get("/eth/pool/:address", ethController.getPool);
router.get("/bsc/ido", mainController.getIDO); //deals API for deal page
router.get("/bsc/pool/:address", mainController.getPool);
router.get("/bsc/stake", mainController.getStake); //stakepad
router.post("/bsc/stake", mainController.createStake); //stakepad - admin create
router.post("/stake/updateUserStaking", mainController.updateUserStaking); //update user staking amount
router.post("/stake/getCountForTierLevel", mainController.getCountForTierLevel); //get users count for each tier level

router.get("/eth/liquidities", ethController.getLiquidities);
router.get("/eth/liquidity/:token/:owner", ethController.getLiquidity);
router.get("/bsc/liquidities", mainController.getLiquidities);
router.get("/bsc/liquidity/:token/:owner", mainController.getLiquidity);

router.get("/eth/tokens", ethController.getTokens);
router.get("/eth/token/:token/:owner", ethController.getToken);
router.get("/bsc/tokens", mainController.getTokens);
router.get("/bsc/token/:token/:owner", mainController.getToken);

router.post("/bsc/webpush", mainController.webPush);
router.post("/eth/webpush", ethController.webPush);

router.post('/create-bsc-ido', mainController.createBSCIDO); //admin create IDO
router.post('/update-ido-weiraiased', mainController.updateIDOWeiRaised); //update wei raised
router.post('/update-user-deposit', mainController.updateUserDeposit); //update user deposit
router.post('/approval/set', mainController.setApproval); // user approves for pool
router.post('/approval/get', mainController.getApproval); //get  user approval status
router.post('/approval/count', mainController.countApproval); //count deal approvals
router.post('/ido/delete', mainController.deleteIDO); //admin - delete pool

router.post('/vote/create', mainController.createVote); //admin create vote
router.post('/vote/get', mainController.getVotes); //user, get vote list
router.post('/vote/place', mainController.placeVote); //user, place yes or no

router.post('/user/getInfo', mainController.getUserInfo); //userinfo
router.post('/user/setEmail', mainController.setUserEmail); //userinfo
router.post('/user/setNonEVM', mainController.setUserNonEVM); //userinfo
router.post('/user/getParticipations', mainController.getUserParticipations); //get status of IDO deal participation

router.post('/card/create', mainController.createCards); //admin create cards
router.post('/card/get', mainController.getCards); //homepage, get cards

router.post('/ping', mainController.ping);
router.post('/temp', mainController.temp); 
module.exports = router;
