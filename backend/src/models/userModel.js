const mongoose  = require("mongoose");

const joiningDetailsSchema = new mongoose.Schema({
    currency: Number,  // 0 - USDT
    joiningAmount: Number,
    transactionId: String,
    selectedPlan: Number,
    dateTimestamp: Number
  })

// Users Schema Starts From Here
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    dropDups: true
  },
  mobile: {
    type: String,
    unique: true,
    dropDups: true
  },
  dob: Number,
  address: String,
  image: String,
  isRoot: Boolean,
  rootReferralCode: String,
  parentReferralCode: String,
  referredBy: String,
  ownReferralCode: String,
  status: Number,   // 0 -Sleep 1- Active 2-Blocked
  password: String,
  package: String,
  joiningAmount: Number
}, { timestamps: true });

const User = mongoose.model('users', UserSchema)

module.exports = User;