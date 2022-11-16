const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcrypt');

//REGISTER
router.route("/Register")
  .post(async (req, res, next) => {
    try {
      const newuser = {
        date: req.body.date,
        password: req.body.password,
        email: req.body.email,
        wallet: req.body.wallet
      };
      const user = await User.create(newuser);
      if (!user) return next(new Error("PIZDETZ"))
      res.status(200).json(user);
      console.log("New user has register :" + req.body.email);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//login
router.route("/login")
  .post(async (req, res,) => {
    console.log(req.body.email+ " trying to login");
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user != null) {
        const validate = bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result === true) {
            const { password, ...others } = user._doc;
            res.status(200).json(others);
            console.log(req.body.email + " has login");
          } else {
            res.status(400).json(err);
          }
        });
      } else {
        !user && res.status(400).json("Invalid Email");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("auth eror");
    }
  });
//login
router.route("/forgetPassword")
  .post(async (req, res,) => {
    console.log(req.body.email+ " has use forget password function");
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user != null && req.body.date == user.date) {
        const pass = await bcrypt.hash(req.body.password, 10);
        const userr = await User.updateOne({ "email": req.body.email }, { $set: { password: pass } });
        res.status(200).json(userr);
      } else {
        res.status(400).json("Invalid date");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("auth eror");
    }
  });


module.exports = router;
