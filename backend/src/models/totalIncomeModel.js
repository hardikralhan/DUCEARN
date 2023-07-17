const mongoose  = require("mongoose");

const TokenSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    throughOwnReferral: Number,
    throughLevel: Number,
}, { timestamps: true });

const TotalIncome = mongoose.model('totalIncome', TokenSchema)

module.exports = TotalIncome