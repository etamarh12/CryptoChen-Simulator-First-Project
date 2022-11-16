const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  wallet: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  BTC: {
    type: Number,
    required: false,
    default: 0
  },
  ETH: {
    type: Number,
    required: false,
    default: 0
  },
  USDT: {
    type: Number,
    required: false,
    default: 0
  },
  USDC: {
    type: Number,
    required: false,
    default: 0
  },
  BNB: {
    type: Number,
    required: false,
    default: 0
  },
  XRP: {
    type: Number,
    required: false,
    default: 0
  },
  BUSD: {
    type: Number,
    required: false,
    default: 0
  },
  ADA: {
    type: Number,
    required: false,
    default: 0
  },
  SOL: {
    type: Number,
    required: false,
    default: 0
  },
  DOGE: {
    type: Number,
    required: false,
    default: 0
  },
  MATIC: {
    type: Number,
    required: false,
    default: 0
  }
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
