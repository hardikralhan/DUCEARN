const mongoose  = require("mongoose");

const TokenSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    commissionFrom: mongoose.Schema.Types.ObjectId,
    userLevel: Number,                     // without userLevel commissioins are of referral
    commissionFromAmount: Number,
    commissionAmount: Number,
    head: Number,                    // 0 - Wallet , 1 - Lost Income
    narrartion: String              // "lowest lost income division",
}, { timestamps: true });

const Commission = mongoose.model('commission', TokenSchema)

module.exports = Commission