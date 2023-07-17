import React, { useState } from 'react'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { registerUserService } from "../../services/authServices";
import {ToastError} from './Toast'

export const Register = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [referralId, setReferralId] = useState("");
    const [isReferralIdValid, setIsReferralIdValid] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("");
    const [totalJoiningAmount, setTotalJoiningAmount] = useState(0);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateData = () => {
        try {
          if (
            name &&
            email &&
            phone &&
            referralId &&
            selectedPlan &&
            totalJoiningAmount &&
            password &&
            confirmPassword
          ) {
            return true;
          } else {
            return false;
          }
        } catch (error) { }
    };

    const registerButtonHandler = async () => { debugger
        try {
          if (validateData()) {
            // if (isReferralIdValid === false) {
            //   ToastError('Referral Id is not valid.')
            //   return
            // }
            // if (isParentIdValid === false) {
            //   ToastError('Parent Id is not valid.')
            //   return
            // }
            if(selectedPlan == "Select Plan"){
                ToastError('Select valid plan.')
                return
            }
            setIsLoading(true);
            let dataToSend = {}; 
            dataToSend.name = name;
            dataToSend.email = email;
            dataToSend.mobile = phone;
            dataToSend.referralCode = referralId;
            dataToSend.selectedPlan = selectedPlan;
            dataToSend.password = password;
            dataToSend.joiningAmount = totalJoiningAmount;
            dataToSend.currency= "busd";
            dataToSend.dob = 24081999,
            await registerUserService(dataToSend);
            navigate("/login", {
              state: {
                email: email,
                amount: totalJoiningAmount,
              },
            });
            setIsLoading(false);
          } else {
            ToastError("Fill all required fields.");
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
          ToastError("Failed To Register:" + error.response.data.error.message);
        }
    };
    const handleJoiningAmountChange = async(plan) =>{
        if(plan == 'Ascend') setTotalJoiningAmount(50)
        else if(plan == 'Elevate') setTotalJoiningAmount(100);
        else if(plan == 'Step-Up') setTotalJoiningAmount(250)
        else if(plan == 'Progress Plus') setTotalJoiningAmount(500);
        else if(plan == 'Uplift') setTotalJoiningAmount(1000);
        else if(plan == 'Next-Level') setTotalJoiningAmount(2000);
        else if(plan == 'Accelerate')setTotalJoiningAmount(5000);
        else if(plan == 'Propel') setTotalJoiningAmount(10000);
    }

  return (
<div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-5xl">
        <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
                
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div className="text-center mb-10">
                    <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                    <p>Enter your information to register</p>
                </div>
                <div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label className="text-xs font-semibold px-1">Email *</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input 
                                    type="email" 
                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                    placeholder="johnsmith@example.com"
                                    value = {email}
                                    onChange = {(e) => {setEmail(e.target.value.replace(/\s/g, ''));}}
                                    >
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label className="text-xs font-semibold px-1">Name *</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="text" 
                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                    placeholder="John"
                                    value = {name}
                                    onChange = {(e) => {setName(e.target.value.replace(/\s/g, ''));}}
                                    >
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label className="text-xs font-semibold px-1">Mobile Number *</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                {/* <input type="text" 
                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                    placeholder="John"
                                    >
                                </input> */}
                                <PhoneInput
                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                    country={"in"}
                                    placeholder="Enter Mobile Number"
                                    enableSearch={true}
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label className="text-xs font-semibold px-1">Refferal-ID *</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input type="nummber" 
                                    value={referralId}
                                    onChange={(e) => {
                                    setReferralId(e.target.value.replace(/\s/g, ''));
                                    }}
                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                    placeholder="Refferal-ID"
                                    >
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-12">
                            <label className="text-xs font-semibold px-1">Password *</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input 
                                    type="password" 
                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                    placeholder="************"
                                    value={password}
                                    onChange={(e) => {
                                    setPassword(e.target.value);
                                    }}>
                                </input>
                            </div>
                        </div>
                        <div className="w-full px-3 mb-12">
                            <label className="text-xs font-semibold px-1">Confirm Password *</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input 
                                    type="password" 
                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                    placeholder="************"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    }}>
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-3 mb-12">
                        <span className="text- font-semibold px-1">Package</span>
                        <select
                            style={{ fontSize: '1.2vw' }}
                            value={selectedPlan}
                            onChange={(e) => {
                                setSelectedPlan(e.target.value);
                                handleJoiningAmountChange(e.target.value);
                            }}
                            className="register_select"
                        >
                        <option value="Select Plan">Select Plan</option>
                        <option value="Ascend">Ascend </option>
                        <option value="Elevate">Elevate </option>
                        <option value="Step-Up">Step-Up </option>
                        <option value="Progress Plus">Progress Plus </option>
                        <option value="Uplift">Uplift </option>
                        <option value="Next-Level">Next-Level </option>
                        <option value="Accelerate">Accelerate </option>
                        <option value="Propel">Propel </option>

                        </select>
                        <div className="w-full px-3 mb-5 mt-5 text-lg">
                                ${totalJoiningAmount}
                        </div>
                        
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <button 
                            onClick={registerButtonHandler} 
                            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
