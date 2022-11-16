const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();


//--------------------------------------------------------------------------------------------------------------------------
//getCoin
router.route("/getCoins/:email")
  .get(async (req, res,) => {
    try {
      const symbol = req.body.symbol;
      const user = await User.findOne({ "email": req.params.email },
        {
          "_id": 0,
          "date": 0,
          "email": 0,
          "wallet": 0,
          "password": 0,
          "__v": 0
        });
      res.status(200).json(user);
    } catch (err) {
      console.log("get coin has failed");
      console.log(err);
      res.status(500).json(err);
    }
  });

//--------------------------------------------------------------------------------------------------------------------------
//resetWallet
router.route("/setWallet")
  .patch(async (req, res) => {
    try {
      const user = await User.findOneAndUpdate({ "email": req.body.email }, {
        $set: {
          wallet: 1000, BTC: 0, ETH: 0, USDT: 0, USDC: 0, BNB: 0, XRP: 0, BUSD: 0, ADA: 0, SOL: 0, DOGE: 0
        },
      }, { upsert: true });
    } catch (err) {
      console.log("reset wallet has failed")
      console.log(err)
      res.status(500).json(err);
    }
  });

//updateWallet
router.route("/updateWallet")
  .patch(async (req, res) => {
    try {
      const user = await User.findOneAndUpdate({ "email": req.body.email }, { $set: { "wallet": req.body.wallet } }, { upsert: true });
    } catch (err) {
      console.log("update wallet has failed")
      console.log(err)
      res.status(500).json(err);
    }
  });
//--------------------------------------------------------------------------------------------------------------------------
//setCoin
router.route("/setCoin")
  .patch(async (req, res,) => {
    try {
      const symbol = req.body.symbol;
      const user = await User.findOneAndUpdate({ "email": req.body.email }, { $inc: { [symbol]: req.body.ammount } }, { upsert: true });
    } catch (err) {
      console.log("set coin has failed")
      console.log(err)
      res.status(500).json(err);
    }
  });
  

//--------------------------------------------------------------------------------------------------------------------------
//getWallet
router.route("/getWallet")
  .get(async (req, res) => {
    try {
      const user = await User.find({ "email": req.body.email }, { wallet: 1, _id: 0 });
      res.status(200).json(user);
    } catch (err) {
      console.log("get wallet has failed")
      console.log(err)
      res.status(500).json(err);
    }
  });
  router.route("/getWallets/:email")
  .get(async (req, res,) => {
    try {
      const user = await User.findOne({ "email": req.params.email });
      res.status(200).json(user);
    } catch (err) {
      console.log("get wallet by email has failed")
      console.log(err)
      res.status(500).json(err);
    }
  });
module.exports = router;
