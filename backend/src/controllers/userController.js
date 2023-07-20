const { getObjectId } = require("../helpers/mongoose/mongooseHelpers.js")
const { getUserDetailService,} = require("../services/userServices.js")

const userDetailsController = async (req, res, next) => {
    try {
        let { token } = req.body

        let result = await getUserDetailService(token);

        return res.status(200).json({ msg: 'Success', result })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    userDetailsController
}