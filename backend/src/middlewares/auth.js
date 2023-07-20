const jwt = require("jsonwebtoken")
const {APIError,HttpStatusCode } = require("../exception/errorHandler.js")
const { getObjectId } = require("../helpers/mongoose/mongooseHelpers.js")

const auth = async (req, res, next) => {
    try {
        // const token = req.headers['x-auth-token'];
        const token = req.headers['authorisation']
        if (!token) {
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'Unauthorized Token');
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (new Date().getTime() > verify.tokenExpiryTime) {
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'Token has been expired. Kindly Relogin!');
        }
        const userId = getObjectId(verify.userId)
        req.body.userId = userId
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = {auth}