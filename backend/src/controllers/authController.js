const { userLoginService, userSignUpService } = require("../services/authServices.js");

const userLoginController = async (req, res, next) => {
    try {
        let { userId, password } = req.body

        const result = await userLoginService(userId.toLowerCase(), password)

        return res.status(200).json({ msg: 'Success', result })
    } catch (error) {
        next(error)
    }
}

const userSignupController = async (req, res, next) => {
    try {
        let { name,dob,mobile,email,referralId,password,confirmPassword,package,joiningAmount,currency } = req.body;

        // let { name,dob,mobile,email,referralId,password,confirmPassword,package,joiningAmount,currency } =  {
        //     "name": "nitin",
        //     "dob": 24081999,
        //     "mobile":9991052862,
        //     "email":"nitin@gmail.com",
        //     "password":"test",
        //     "confirmPassword":"test",
        //     "package":"Ascend",
        //     "joiningAmount": 50,
        //     "currency": "busd"
        // }

        const result = await userSignUpService(name,dob,mobile,email.toLowerCase(),referralId,password,confirmPassword,package,joiningAmount,currency);

        return res.status(200).json({ msg: 'Successfully Signed Up', result});
    } catch (error) {
        next(error)
    }
}

module.exports = {userLoginController, userSignupController};