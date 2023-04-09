const express = require("express");
const router = express.Router();

const ethController = require("./controllers/ethController");
const bscController = require("./controllers/bscController");
const twitterController = require("./controllers/twitterController");

router.get("/get-followers/:username", twitterController.getFollowers);

router.get("/eth/ido", ethController.getIDO);
router.get("/eth/pool/:address", ethController.getPool);
router.get("/bsc/ido", bscController.getIDO); //deals API for deal page
router.get("/bsc/pool/:address", bscController.getPool);
router.get("/bsc/stake", bscController.getStake); //stakepad
router.post("/bsc/stake", bscController.createStake); //stakepad

router.get("/eth/liquidities", ethController.getLiquidities);
router.get("/eth/liquidity/:token/:owner", ethController.getLiquidity);
router.get("/bsc/liquidities", bscController.getLiquidities);
router.get("/bsc/liquidity/:token/:owner", bscController.getLiquidity);

router.get("/eth/tokens", ethController.getTokens);
router.get("/eth/token/:token/:owner", ethController.getToken);
router.get("/bsc/tokens", bscController.getTokens);
router.get("/bsc/token/:token/:owner", bscController.getToken);

router.post("/bsc/webpush", bscController.webPush);
router.post("/eth/webpush", ethController.webPush);

router.post('/create-bsc-ido', bscController.createBSCIDO); //admin create IDO
router.post('/update-ido-weiraiased', bscController.updateIDOWeiRaised); //update wei raised
router.post('/approval/set', bscController.setApproval); // user approves for pool
router.post('/approval/get', bscController.getApproval); //get  user approval status
router.post('/approval/count', bscController.countApproval); //count deal approvals

router.post('/ping', bscController.ping);
router.post('/temp', bscController.temp); 
module.exports = router;
