const mongoose  = require("mongoose");

const ReferralSchema = new mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId,
    totalReferralGiven: Number,
    referralGivenTo: Array
}, { timestamps: true });

const ReferralRecord = mongoose.model('ReferralRecord', ReferralSchema)

module.exports = ReferralRecord