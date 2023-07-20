const mongoose = require("mongoose")

const getObjectId = (id) => {
    return mongoose.Types.ObjectId(id);
}

module.exports = {getObjectId}