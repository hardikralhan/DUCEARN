const User = require("../models/userModel");
const TotalIncome = require("../models/totalIncomeModel");
const Wallet = require("../models/walletModel");
const Token = require("../models/tokenModel");
const {APIError,HttpStatusCode } = require("../exception/errorHandler.js")

//#region Get User Details Service
const getUserDetailService = async (token) => {
    try {
        const tokenPipeline = [
            {
                $match:{
                    token: token
                }
            }
        ]
        let userToken = await Token.aggregate(tokenPipeline);

        const userPipeline = [
            {
                $match:{
                    _id: userToken[0].userId
                }
            }
        ]
        let userArray = await User.aggregate(userPipeline);

        let userData = userArray[0];

        const totalIncomePipeline = [
            {
                $match:{
                    userId: userData._id
                }
            }
        ]
        let totalIncome = await TotalIncome.aggregate(totalIncomePipeline);

        const walletPipeline = [
            {
                $match:{
                    userId: userData._id
                }
            }
        ]
        let wallet = await Wallet.aggregate(walletPipeline);

        return {
            userDetails: userData,
            totalIncomeDetails: totalIncome[0],
            walletDetails: wallet[0]
        }


        

    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}
//#endregion

module.exports = {
    getUserDetailService
}