const { comparePassword, encryptPassword } = require("../helpers/passwordEncryption/passwordEncryption.js")
const User = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
const Token = require("../models/tokenModel.js")
const Parent = require("../models/parentModel.js")
const ReferralRecord = require("../models/ReferralRecordModel.js")
const TotalIncome = require("../models/totalIncomeModel.js")
const Wallet = require("../models/walletModel.js")
const Transaction = require("../models/transactionModel.js")
const CONSTANTS = require("../constants/const.js")
// const { getAllDownlineMember, getUserIdByOwnReferralIdService } = require("./userServices.js")
// const { ZEPX_IN_ONE_DOLLAR } = require("../constants/zepxDetails.js")
const {APIError,  HttpStatusCode } = require("../exception/errorHandler.js")
const Commission = require("../models/commission.js")

const userLoginService = async (userId, password) => {
    try {

        //#region User Pipeline
        let userPipeline = [
            {
                $project: {
                    email: { $toLower: '$email' },
                    status: '$status',
                    password: '$password',
                    name: '$name'
                }
            },
            {
                $match: {
                    email: userId
                }
            }
        ]
        //#endregion

        let result = await User.aggregate(userPipeline)
        if (result.length == 0) {
            // Reject Promise If User Has Not Been Found.
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'This user does not exist.')
        }

        let userDetails = result[0]

        if (userDetails.status == 2) {
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'You are blocked by the administrator. Kindly contact admin.')
        }

        let hashedPassword = userDetails.password
        
        let isPasswordMatched = await comparePassword(password, hashedPassword)

        // to be deleted once registration is done
        isPasswordMatched = true;

        console.log(isPasswordMatched);
        if (isPasswordMatched) {

            // getting Token of User
            let tokenObj = await getTokenOfUserService(userDetails._id)

            if (tokenObj == null || new Date().getTime() > tokenObj.expiresAt) {
                await generateTokenService(userDetails._id)
                // getting Token of User
                tokenObj = await getTokenOfUserService(userDetails._id)
            }
            console.log({
                token: tokenObj.token,
                expiresAt: tokenObj.expiresAt,
                userName: userDetails.name
            });
            return {
                token: tokenObj.token,
                expiresAt: tokenObj.expiresAt,
                userName: userDetails.name
            }
        }
        else {
            // Return Error Message Because Password Does Not Matched
            throw new APIError("UNAUTHORIZED_REQUEST", HttpStatusCode.UNAUTHORIZED_REQUEST, true, 'Password does not match.')
        }

    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

//#region Generate JWT Token
const generateTokenService = async (userId) => {
    try {

        //generate new token
        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        let generatedTime = new Date().getTime()
        let tokenExpiryTime = generatedTime + 24 * 60 * 60 * 1000   // Token Expires In 1 Day

        let data = {
            userId: userId,
            tokenExpiryTime: tokenExpiryTime
        }

        const token = jwt.sign(data, jwtSecretKey);

        // Deleting Previous Token
        await Token.findOneAndDelete({ userId: userId })

        // Creating Token Object To Store In DB
        let tokenObject = {
            userId: userId,
            token: token,
            expiresAt: tokenExpiryTime
        }

        let tokenData = await Token.create(tokenObject)
        await tokenData.save()

        // Resolve Promise
        return Promise.resolve()
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}
//#endregion
//#region Get Token Of User
const getTokenOfUserService = async (userId) => {
    try {

        //#region Token Pipeline
        let tokenPipeline = [
            {
                $match: {
                    userId: userId
                }
            }
        ]
        //#endregion

        let res = await Token.aggregate(tokenPipeline)
        if (res.length > 0) {
            return res[0]
        }
        else {
            return null
        }

    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}
//#endregion
//#endregion

const userSignUpService = async (name,dob,mobile,email,referralCode,password,confirmPassword,package,amount,currency) => {
    try {
        const aggregate = [
            {
                $match: {
                    email: email
                }
            }
        ]
        const userExists = await User.aggregate(aggregate);

        if(userExists.length != 0){
            throw new APIError("BAD_INPUT", HttpStatusCode.BAD_INPUT, true, 'This user already exists.')
        }

        if(password != confirmPassword){
            throw new APIError("BAD_INPUT", HttpStatusCode.BAD_INPUT, true, 'Password does not match.')
        }

        let isRoot = false;

        if(referralCode == ''){
            referralCode = await getCompanyReferralCode()
        }
        let checkReferralCodeExistsPipeline = [
            {
                $match:{
                    ownReferralCode: referralCode
                }
            }
        ]
        let checkReferralCodeExists = await User.aggregate(checkReferralCodeExistsPipeline);
        if(checkReferralCodeExists.length == 0){
            throw new APIError("BAD_INPUT", HttpStatusCode.BAD_INPUT, true, 'Referral Id does not exists.')
        }
        
        // Generating Own Referral Code
        let ownReferralCode = null

        while (ownReferralCode == null) {
            ownReferralCode = await generateNewReferralCodeService()
        }

        // Hashing Password
        password = await encryptPassword(password)

        // find parent userId and parentReferralCode
        const parentData = await getCurrentParent();
        let joining_amount = amount;

        //if no parent that means this is the first user (root user)
        if(parentData == undefined || parentData.length == 0 ){
            isRoot = true;

            //Preparing Object To Insert
            // giving referral code of company to root
            let userObject = {
                name: name,
                email: email,
                dob:dob,
                mobile: mobile,
                image: '',
                ownReferralCode: referralCode,
                parentReferralCode: referralCode,
                isRoot: isRoot,
                referredBy: referralCode,
                rootReferralCode: referralCode,
                password: password,
                status: 1,
                package: package,
                joiningAmount: joining_amount
            }

            let user = await User.create(userObject)
            await user.save();

            let userIdByReferral = await getUserIdByOwnReferralIdService(referralCode);

            let parentObject = {
                userId : userIdByReferral,
                totalChildren: 0,
                rootUser: userIdByReferral,
                level: 0,
                currentParent: true,
                parentUser: userIdByReferral,
                userCountByRoot: 1
            }

            let parent = await Parent.create(parentObject)
            await parent.save();

            let referralObject = {
                userId : userIdByReferral,
                totalReferralGiven: 0,
                referralGivenTo: []
            }

            let referralRecord = await ReferralRecord.create(referralObject)
            await referralRecord.save();

            // Total Income added
            let TIObject = {
                userId: userIdByReferral,
                throughOwnReferral: 0,
                throughLevel: 0
            }
            const TI = await TotalIncome.create(TIObject);
            await TI.save();

            // Wallet added
            let walletObject = {
                userId : userIdByReferral,
                walletBalance: 0,
                lostBalance: 0
            }
            let wallet = await Wallet.create(walletObject)
            await wallet.save();

            // transactionadded
            let transactionObject = {
                userId : userIdByReferral,
                narrations: CONSTANTS.NARRATION.REGISTRATION,
                amount: joining_amount,
                currency: currency,
                package: package
            }
            let transaction = await Transaction.create(transactionObject)
            await transaction.save();

            return;
        }
        else{

            const rootUserDetails = await getRootUserDetails();

            const parentUserDetails = await getUserDetailsByUserId(parentData.userId);

            // get referral user Id from the referral received
            let userIdOfReferrer = await getUserIdByOwnReferralIdService(referralCode);

            // save this new user in users table
            let userObject = {
                name: name,
                email: email,
                dob:dob,
                mobile: mobile,
                image: '',
                ownReferralCode: ownReferralCode,
                parentReferralCode: parentUserDetails.ownReferralCode,
                isRoot: isRoot,
                referredBy: referralCode,
                rootReferralCode: rootUserDetails.ownReferralCode,
                password: password,
                status: 1,
                package: package,
                joiningAmount: joining_amount
            }

            let user = await User.create(userObject)
            await user.save();

            // get result from saved users doc of this user


            const lastUserRegisteredNumber = await getLastUserNumber(); 
            // we will get the new user's Id
            let userIdByOwnReferral = await getUserIdByOwnReferralIdService(ownReferralCode);
            // let userIdByOwnReferral = await getUserIdByOwnReferralIdService("DU2972339");
            

            // calculating for which level should new user will come
            let totalNumbersTillCurrentLevel = 0;
            let currentLevel = lastUserRegisteredNumber.level;
            for(let i=0;i<=currentLevel;i++){
                totalNumbersTillCurrentLevel += Math.pow(3,i);
            }

            let newLevel;
            if(lastUserRegisteredNumber.userCountByRoot === totalNumbersTillCurrentLevel){
                newLevel = currentLevel + 1;
            }else newLevel = currentLevel;

            let parentObject = {
                userId : userIdByOwnReferral,
                totalChildren: 0,
                rootUser: rootUserDetails._id,
                level: newLevel,
                parentUser: parentData.userId,
                userCountByRoot: lastUserRegisteredNumber.userCountByRoot + 1
            }

            let parent = await Parent.create(parentObject)
            await parent.save();

            let referralObject = {
                userId : userIdByOwnReferral,
                totalReferralGiven: 0,
                referralGivenTo: []
            }

            let referralRecord = await ReferralRecord.create(referralObject)
            await referralRecord.save();

            // Total Income added
            let TIObject = {
                userId: userIdByOwnReferral,
                throughOwnReferral: 0,
                throughLevel: 0
            }
            const TI = await TotalIncome.create(TIObject);
            await TI.save();

            // Wallet added
            let walletObject = {
                userId : userIdByOwnReferral,
                walletBalance: 0,
                lostBalance: 0
            }
            let wallet = await Wallet.create(walletObject)
            await wallet.save();

            // transactionadded
            let transactionObject = {
                userId : userIdByOwnReferral,
                narrations: CONSTANTS.NARRATION.REGISTRATION,
                amount: joining_amount,
                currency: currency,
                package: package
            }
            let transaction = await Transaction.create(transactionObject)
            await transaction.save();

            // get count of this user by getting data from parent table in userCountByRoot in desc


            // update parent table doc for current user's parent

            let parentObjectUpdateForParent = {

                totalChildren: parentData.totalChildren + 1,
            }
            if(parentData.totalChildren == 0){
                parentObjectUpdateForParent.userOneId = userIdByOwnReferral
            }else if(parentData.totalChildren == 1){
                parentObjectUpdateForParent.userTwoId = userIdByOwnReferral
            }else if(parentData.totalChildren == 2){
                parentObjectUpdateForParent.userThreeId = userIdByOwnReferral
                parentObjectUpdateForParent.currentParent = false;

                // also update for next user and make them parent
                const parentPipelineForNextUser = [
                    {
                        $match:{
                            userCountByRoot: parentData.userCountByRoot + 1
                        }
                    }
                ]
    
                const nextParentData = await Parent.aggregate(parentPipelineForNextUser);
    
                let nextParentObjectUpdate = {
                    currentParent: true,
                }
    
                await Parent.findOneAndUpdate
                ({
                    _id:nextParentData[0]._id
                },
                {
                    $set: nextParentObjectUpdate
                },
                {
                    new: true
                });
            }
            await Parent.findOneAndUpdate
            ({
                _id:parentData._id
            },
            {
                $set: parentObjectUpdateForParent
            },
            {
                new: true
            });
            
            

            const ReferralRecordPipeline = [
                {
                    $match:{
                        userId: userIdOfReferrer
                    }
                }
            ]
            const RefreereferralData = await ReferralRecord.aggregate(ReferralRecordPipeline);
            let array = RefreereferralData[0].referralGivenTo;
            array.push(referralCode);

            await ReferralRecord.findOneAndUpdate
            ({
                userId:userIdOfReferrer
            },
            {
                $set: {
                    totalReferralGiven: RefreereferralData[0].totalReferralGiven + 1,
                    referralGivenTo: array
                }
            },
            {
                new: true
            });

            // distribute 25% referral profit to referral user  ------------------------------==========================================
            // update into wallet(update), commission(insert), totalIncome(update) for referral user

            let amountByRefferal = joining_amount * 0.25;

            // get old totalIncome details of refreer (whose referral received)
            let totalIncomepipe = [
                {
                    $match:{
                        userId: userIdOfReferrer
                    }
                }
            ]
            let refreeTotalIncomeData = await TotalIncome.aggregate(totalIncomepipe);
            let total_income =  refreeTotalIncomeData[0].throughOwnReferral + refreeTotalIncomeData[0].throughLevel;
            const profit_lossOFRefree = await checkProfitAndLostIncome(amountByRefferal,total_income,userIdOfReferrer);
            // update
            if(profit_lossOFRefree.profit > 0){  // if there is a profit then only it will update to total income
                await updatetotalIncome( {userId : refreeTotalIncomeData[0].userId}, 
                    {
                        throughOwnReferral : refreeTotalIncomeData[0].throughOwnReferral + profit_lossOFRefree.profit,
                    }
                )
                await insertCommission({
                    userId: userIdOfReferrer,
                    commissionFrom: userIdByOwnReferral,
                    commissionFromAmount: joining_amount,
                    commissionAmount: profit_lossOFRefree.profit,
                    head: 0
                });
            }
            if(profit_lossOFRefree.loss > 0){   // add into commission table if loss and profit or only loss no profit
                await insertCommission({
                    userId: userIdOfReferrer,
                    commissionFrom: userIdByOwnReferral,
                    commissionFromAmount: joining_amount,
                    commissionAmount: profit_lossOFRefree.loss,
                    head: 1
                });
            }

            // get old wallet details of refreer (whose referral received)
            let walletpipe = [
                {
                    $match:{
                        userId: userIdOfReferrer
                    }
                }
            ]
            let refreeWalletData = await Wallet.aggregate(walletpipe);
            await updateWallet( {userId:refreeWalletData[0].userId}, 
                {
                    walletBalance : refreeWalletData[0].walletBalance + profit_lossOFRefree.profit,
                    lostBalance : refreeWalletData[0].lostBalance + profit_lossOFRefree.loss
                }
            );
            

            ///////////////////////////////////////////////////////////////////////////////////////////////////// 25% distributed end
            
            let currentUserId = userIdByOwnReferral
            // get parent details of refree
            let parentTablePipeline = [
                {
                    $match:{
                        userId: userIdByOwnReferral
                    }
                }
            ]
            
            // distribute Level Income
            let parentTableDetails = await Parent.aggregate(parentTablePipeline);  // new user parent table

            // get parent user ka parentreferralCode
            let parentUserData = await getUserDetailsByUserId(parentTableDetails[0].parentUser);
            let checkCount = 1;
            let levels = 0;

            
            checkRootUserPipeline = [
                {
                    $match:{
                        _id: userIdByOwnReferral
                    }
                }
            ]
            
            rootUserCame = await User.aggregate(checkRootUserPipeline);
            let rootUserCheck = rootUserCame[0].ownReferralCode

            while((levels == 0 || levels == 12) || (rootUserDetails.ownReferralCode != rootUserCheck && checkCount <13)){
                levels ++;

                // // check totalIncome of this parent
                const totalPipe = [
                    {
                        $match:{
                            userId: parentUserData._id
                        }
                    }
                ]
                let totalIncomeArrayOfParentUser = await TotalIncome.aggregate(totalPipe);
                let totalIncomeOfParentUser = totalIncomeArrayOfParentUser[0].throughOwnReferral + totalIncomeArrayOfParentUser[0].throughLevel 

                // // check how many referrals given by this parent
                const referralPipe = [
                    {
                        $match:{
                            userId: parentUserData._id
                        }
                    }
                ]
                let referralsOfParentUser = await ReferralRecord.aggregate(referralPipe);

                // check wallet balance of parent user
                let walletpipeli = [
                    {
                        $match:{
                            userId: parentUserData._id
                        }
                    }
                ]
                let WalletDataOfParentUser = await Wallet.aggregate(walletpipeli);

                // parent table of parent user Data
                let parentTableOfParentUserDataPipeline = [
                    {
                        $match:{
                            userId: parentUserData._id
                        }
                    }
                ]
                let parentTableOfParentUserData = await Parent.aggregate(parentTableOfParentUserDataPipeline);

                if(levels == 1 && referralsOfParentUser[0].referralGivenTo.length >= 0){
                    // check how much income they will be receiving out of the purchase
                    let calculatedProfit = joining_amount * 0.10;                    
                    if(parentTableOfParentUserData[0].totalChildren == 3 && referralsOfParentUser[0].referralGivenTo.length == 0){
                        // unn 3 users se kitna level income lost me gaya hai // phir unme se jiska bhi sabse kam usko daldo usko wallet balance me daaldo commission dedo toal income as well
                        let commPipe1 = [
                            {
                                $match:{
                                    userId: parentTableOfParentUserData[0].userId,
                                    commissionFrom: parentTableOfParentUserData[0].userOneId,
                                    head:1  // lost income
                                }
                            }
                        ]
                        let commissionUserOne = await Commission.aggregate(commPipe1);

                        let commPipe2 = [
                            {
                                $match:{
                                    userId: parentTableOfParentUserData[0].userId,
                                    commissionFrom: parentTableOfParentUserData[0].userTwoId,
                                    head:1  // lost income
                                }
                            }
                        ]
                        let commissionUserTwo = await Commission.aggregate(commPipe2);

                        let arr = [];
                        arr.push(commissionUserOne[0].commissionAmount); arr.push(commissionUserTwo[0].commissionAmount); arr.push(calculatedProfit)
                        let lowest = Math.min.apply( Math, arr );
                        // whichever the lowest, insert into wallet balance total income through level, commission
                        await updatetotalIncome( {userId : totalIncomeArrayOfParentUser[0].userId}, 
                            {
                                throughLevel : totalIncomeArrayOfParentUser[0].throughLevel + lowest,
                            }
                        )
                        await insertCommission({
                            userId: totalIncomeArrayOfParentUser[0].userId,
                            commissionFrom: currentUserId,
                            userLevel: levels,
                            narrartion: "lowest lost income division",
                            commissionFromAmount: joining_amount,
                            commissionAmount: lowest,
                            head: 0  // go in wallet
                        });
                        await updateWallet( {userId : totalIncomeArrayOfParentUser[0].userId}, 
                            {
                                walletBalance : WalletDataOfParentUser[0].walletBalance + lowest,
                            }
                        )
                    }else if((parentTableOfParentUserData[0].totalChildren == 1 || parentTableOfParentUserData[0].totalChildren == 2) && referralsOfParentUser[0].referralGivenTo.length == 0){
                        // directly go into lost
                        await insertCommission({
                            userId: totalIncomeArrayOfParentUser[0].userId,
                            commissionFrom: currentUserId,
                            userLevel: levels,
                            commissionFromAmount: joining_amount,
                            commissionAmount: calculatedProfit,
                            head: 1  // go in loss
                        });
                        await updateWallet( {userId : totalIncomeArrayOfParentUser[0].userId}, 
                            {
                                lostBalance : WalletDataOfParentUser[0].lostBalance + calculatedProfit
                            }
                        )
                    }else{
                        let profit_lossOfParentUser = await checkProfitAndLostIncome(calculatedProfit,totalIncomeOfParentUser,totalIncomeArrayOfParentUser[0].userId);
                        await levelIncomeDistributionAfterProfitLoss(profit_lossOfParentUser,totalIncomeArrayOfParentUser,currentUserId,levels,joining_amount,WalletDataOfParentUser);
                    }
                    

                }else if(levels == 2 && referralsOfParentUser[0].referralGivenTo.length >= 1){
                    let calculatedProfit = joining_amount * 0.06;                    
                    let profit_lossOfParentUser = await checkProfitAndLostIncome(calculatedProfit,totalIncomeOfParentUser,totalIncomeArrayOfParentUser[0].userId);
                    await levelIncomeDistributionAfterProfitLoss(profit_lossOfParentUser,totalIncomeArrayOfParentUser,currentUserId,levels,joining_amount,WalletDataOfParentUser);

                }else if(levels == 3 && referralsOfParentUser[0].referralGivenTo.length >= 1){
                    let calculatedProfit = joining_amount * 0.04;                    
                    let profit_lossOfParentUser = await checkProfitAndLostIncome(calculatedProfit,totalIncomeOfParentUser,totalIncomeArrayOfParentUser[0].userId);
                    await levelIncomeDistributionAfterProfitLoss(profit_lossOfParentUser,totalIncomeArrayOfParentUser,currentUserId,levels,joining_amount,WalletDataOfParentUser);
                    
                }else if(levels == 4 && referralsOfParentUser[0].referralGivenTo.length >= 1){
                    let calculatedProfit = joining_amount * 0.02;                    
                    let profit_lossOfParentUser = await checkProfitAndLostIncome(calculatedProfit,totalIncomeOfParentUser,totalIncomeArrayOfParentUser[0].userId);
                    await levelIncomeDistributionAfterProfitLoss(profit_lossOfParentUser,totalIncomeArrayOfParentUser,currentUserId,levels,joining_amount,WalletDataOfParentUser);
                }else if(levels == 5 && referralsOfParentUser[0].referralGivenTo.length >= 2){
                    let calculatedProfit = joining_amount * 0.02;                    
                    let profit_lossOfParentUser = await checkProfitAndLostIncome(calculatedProfit,totalIncomeOfParentUser,totalIncomeArrayOfParentUser[0].userId);
                    await levelIncomeDistributionAfterProfitLoss(profit_lossOfParentUser,totalIncomeArrayOfParentUser,currentUserId,levels,joining_amount,WalletDataOfParentUser);
                }else if((levels == 6 || levels == 7 || levels == 8)  && referralsOfParentUser[0].referralGivenTo.length >= 2){
                    let calculatedProfit = joining_amount * 0.01;                    
                    let profit_lossOfParentUser = await checkProfitAndLostIncome(calculatedProfit,totalIncomeOfParentUser,totalIncomeArrayOfParentUser[0].userId);
                    await levelIncomeDistributionAfterProfitLoss(profit_lossOfParentUser,totalIncomeArrayOfParentUser,currentUserId,levels,joining_amount,WalletDataOfParentUser);
                }else if((levels == 9 || levels == 10 || levels == 11 || levels == 12) && referralsOfParentUser[0].referralGivenTo.length >= 3){
                    let calculatedProfit = joining_amount * 0.01;                    
                    let profit_lossOfParentUser = await checkProfitAndLostIncome(calculatedProfit,totalIncomeOfParentUser,totalIncomeArrayOfParentUser[0].userId);
                    await levelIncomeDistributionAfterProfitLoss(profit_lossOfParentUser,totalIncomeArrayOfParentUser,currentUserId,levels,joining_amount,WalletDataOfParentUser);
                }else{
                    // give all the profit into lost income of that user

                    let times = await getMultiplierByLevels(levels);
                    let calculatedProfit = joining_amount * times;

                    await insertCommission({
                        userId: totalIncomeArrayOfParentUser[0].userId,
                        commissionFrom: currentUserId,
                        userLevel: levels,
                        commissionFromAmount: joining_amount,
                        commissionAmount: calculatedProfit,
                        head: 1
                    });

                    await updateWallet( {userId : totalIncomeArrayOfParentUser[0].userId}, 
                        {
                            lostBalance : WalletDataOfParentUser[0].lostBalance + calculatedProfit
                        }
                    )
                }

                // get me next parent
                parentTablePipeline = [
                    {
                        $match:{
                            userId: parentUserData._id
                        }
                    }
                ]
                
                parentTableDetails = await Parent.aggregate(parentTablePipeline);

                parentUserData = await getUserDetailsByUserId(parentTableDetails[0].parentUser);

                // giving old userId
                userIdByOwnReferral = totalIncomeArrayOfParentUser[0].userId
                checkRootUserPipeline = [
                    {
                        $match:{
                            _id: userIdByOwnReferral
                        }
                    }
                ]
                
                rootUserCame = await User.aggregate(checkRootUserPipeline);
                rootUserCheck = rootUserCame[0].ownReferralCode
                checkCount ++;
            }
            return;
        }
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

const getCompanyReferralCode = async () =>{
    try {
        return process.env.COMPANY_REFERRAL_ID
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

const getCurrentParent = async () =>{
    try {
        const parentPipeline = [
            {
                $match: {
                    currentParent: true
                },
            },
        ];
        const result = await Parent.aggregate(parentPipeline);

        return result[0];


    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

//#region Generate New Referral Code Service
const generateNewReferralCodeService = async () => {
    try {
        let random = Math.floor(1000000 + Math.random() * 9000000)

        let str = 'DU'+ random;

        // Verifying Generated Referral Code
        const isFound = await getUserIdByOwnReferralIdService(str)

        if (isFound == null) {
            return str
        } else {
            return null
        }
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

//#region Get UserId by Referral Code
const getUserIdByOwnReferralIdService = async (referralCode) => {
    try {

        let userDetailsPipeline = [
            {
                $match: {
                    ownReferralCode: referralCode
                }
            },
            {
                $project: {
                    userId: '$_id'
                }
            }
        ]

        let userId = null

        let result = await User.aggregate(userDetailsPipeline)
        if (result.length > 0) {
            userId = result[0].userId
        }

        // Resolve Promise
        return userId
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

const getRootUserDetails = async()=>{
    try {

        let rootUserPipeline = [
            {
                $match: {
                    isRoot: true
                }
            },
        ]

        let result = await User.aggregate(rootUserPipeline)
        if(result.length != 0){
            return result[result.length - 1]
        }else throw new APIError("INTERNAL_SERVER", HttpStatusCode.INTERNAL_SERVER, true, 'First create a root user.')
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}
//#endregion

const getLastUserNumber = async()=>{
    try {

        let lastUserRegisteredPipeline = [
            {
                $sort: {
                    userCountByRoot: -1
                }
            },
            {
                $limit: 5
            }
        ]

        let result = await Parent.aggregate(lastUserRegisteredPipeline)
        
        return result[0];
        
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

const getUserDetailsByUserId = async(userId)=>{
    try {

        let UserDetailsByUserIdPipeline = [
            {
                $match: {
                    _id: userId 
                }
            },
        ]

        let result = await User.aggregate(UserDetailsByUserIdPipeline)
        
        return result[0];
        
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

const getParentTableOfUser = async (referralCode) =>{
    try {
        const parentPipeline =[
            {
                 $match:{
                     ownReferralCode: referralCode
                 }
            }
        ]
        let result = await User.aggregate(parentPipeline)
        
        return result[0];

    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

const updateWallet = async(condition,doc) =>{
    try {
        await Wallet.findOneAndUpdate(condition,
        {
            $set: doc
        },
        {
            new: true
        });
        return;
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

const updatetotalIncome = async(condition,doc) =>{
    try {
        await TotalIncome.findOneAndUpdate(condition,
        {
            $set: doc
        },
        {
            new: true
        });
        return;
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

const insertTransaction = async(doc) =>{
    try {
        const transaction = await Transaction.create(doc);
        await transaction.save()
        return;
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

const insertCommission = async(doc) =>{
    try {
        const commission = await Commission.create(doc);
        await commission.save()
        return;
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

// amount -> amount coming as income, total_income -> total_income of that user, userID -> user id of that user
// function to calculate wether amount will go in profit or loss
// balance will go from total income till date of the user
const checkProfitAndLostIncome = async(amount,total_income,userId) =>{
    const userDetails = await getUserDetailsByUserId(userId);
    let package = userDetails.package;

    let obj = {};
    let remainingBalance = 0;
    if(package == CONSTANTS.PACKAGES.ASCEND){
        remainingBalance = 50 * 3 - total_income     // 150 - 100
    }else if(package == CONSTANTS.PACKAGES.ELEVATE){
        remainingBalance = 100 * 4 - total_income
    }else if(package == CONSTANTS.PACKAGES.STEP_UP){
        remainingBalance = 250 * 5 - total_income
    }else if(package == CONSTANTS.PACKAGES.PROGRESS_PLUS){
        remainingBalance = 500 * 6 - total_income
    }else if(package == CONSTANTS.PACKAGES.UPLIFT){
        remainingBalance = 1000 * 7 - total_income
    }else if(package == CONSTANTS.PACKAGES.NEXT_LEVEL){
        remainingBalance = 2000 * 8 - total_income
    }else if(package == CONSTANTS.PACKAGES.ACCELERATE){
        remainingBalance = 5000 * 9 - total_income
    }else if(package == CONSTANTS.PACKAGES.PROPEL){
        remainingBalance = 10000 * 10 - total_income
    }

    if(remainingBalance > 0){
        if(remainingBalance > amount){     // only profit
            obj.profit = amount;
            // obj.balance = total_income + obj.profit;
            obj.loss = 0;
        }else if (remainingBalance < amount){     // profit and loss both
            obj.loss = amount - remainingBalance;
            obj.profit = remainingBalance;
            // obj.balance = 0;
        }else {
            obj.profit = amount;   // only profit because balance in wallet and amount receiving is same and > 0
            // obj.balance = 0;
            obj.loss = 0;
        }
    }else{          // remaining balance be 0 
        obj.loss = amount;
        obj.profit = 0;
        // obj.balance = 0;
    }

    return obj
}

const levelIncomeDistributionAfterProfitLoss = async(profit_lossOfParentUser,totalIncomeArrayOfParentUser,currentUserId,levels,joining_amount,WalletDataOfParentUser) => {
    try {
        if(profit_lossOfParentUser.profit > 0){  // if there is a profit then only it will update to total income
            await updatetotalIncome( {userId : totalIncomeArrayOfParentUser[0].userId}, 
                {
                    throughLevel : totalIncomeArrayOfParentUser[0].throughLevel + profit_lossOfParentUser.profit,
                }
            )
            await insertCommission({
                userId: totalIncomeArrayOfParentUser[0].userId,
                commissionFrom: currentUserId,
                userLevel: levels,
                commissionFromAmount: joining_amount,
                commissionAmount: profit_lossOfParentUser.profit,
                head: 0
            });
        }
        if(profit_lossOfParentUser.loss > 0){   // add into commission table if loss and profit or only loss no profit
            await insertCommission({
                userId: totalIncomeArrayOfParentUser[0].userId,
                commissionFrom: currentUserId,
                userLevel: levels,
                commissionFromAmount: joining_amount,
                commissionAmount: profit_lossOfParentUser.loss,
                head: 1
            });
        }
        await updateWallet( {userId : totalIncomeArrayOfParentUser[0].userId}, 
            {
                walletBalance : WalletDataOfParentUser[0].walletBalance + profit_lossOfParentUser.profit,
                lostBalance : WalletDataOfParentUser[0].lostBalance + profit_lossOfParentUser.loss
            }
        )
    
        // update wallet   
    } catch (error) {
        throw new APIError(error.name, error.httpCode, error.isOperational, error.message);
    }
}

const getMultiplierByLevels = async (level) =>{
    if(level==1) return 0.10
    else if(level == 2) return 0.06
    else if(level == 3) return 0.04
    else if(level == 4) return 0.02
    else if(level == 5) return 0.02
    else if(level == 6 || level == 7 || level == 8 || level == 9 || level == 10 || level == 11 || level == 12 ) return 0.01
}

module.exports = {
    userLoginService,
    generateTokenService,
    getTokenOfUserService,
    userSignUpService,
    getCompanyReferralCode,
    getCurrentParent,
    generateNewReferralCodeService,
    getUserIdByOwnReferralIdService,
    getRootUserDetails,
    getLastUserNumber,
    getUserDetailsByUserId,
    getParentTableOfUser,
    updateWallet,
    updatetotalIncome,
    insertTransaction,
    insertCommission,
    levelIncomeDistributionAfterProfitLoss,
    getMultiplierByLevels

}