const mongoose  = require("mongoose");

const ParentSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    userOneId: mongoose.Schema.Types.ObjectId,
    userTwoId: mongoose.Schema.Types.ObjectId,
    userThreeId: mongoose.Schema.Types.ObjectId,
    totalChildren: Number,
    rootUser: mongoose.Schema.Types.ObjectId,
    level: Number,               // level from referral user
    currentParent: Boolean,
    parentUser: mongoose.Schema.Types.ObjectId,
    userCountByRoot: Number
}, { timestamps: true });

const Parent = mongoose.model('parent', ParentSchema)

module.exports = Parent