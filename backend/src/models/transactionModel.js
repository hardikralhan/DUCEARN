const mongoose  = require("mongoose");

const TokenSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    narrations: String,
    amount: Number,
    package: String,              // only when registration will happen
    currency: String
}, { timestamps: true });

const Transaction = mongoose.model('transaction', TokenSchema)

module.exports = Transaction