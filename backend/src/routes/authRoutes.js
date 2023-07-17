const express = require("express");
const {userLoginController, userSignupController} = require('../controllers/authController.js');
// import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.post('/login',userLoginController)
router.post('/signup',userSignupController)
router.post('/chalja',((req,res)=>{
    return res.json({"heelo" : "newa"})
}))
// router.put('/changepasscode',[auth],changePasscodeController)

module.exports = router;