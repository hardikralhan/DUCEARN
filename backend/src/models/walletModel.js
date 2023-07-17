const mongoose  = require("mongoose");

const TokenSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    walletBalance: Number,
    lostBalance: Number,
}, { timestamps: true });

const Wallet = mongoose.model('wallet', TokenSchema)

module.exports = Wallet