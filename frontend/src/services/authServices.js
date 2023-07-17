import axios from "axios";
import { SERVER_URL } from "../GlobalVariable.js";

const getAxiosHeader = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        }
    }
}

export const getUserNameByReferralCodeService = async (referralId, token) => {
    let url = `${SERVER_URL}/api/user/getUserNameByReferralId/${referralId}`
    return await axios.get(url, getAxiosHeader(token))
}   

export const getRootIdByReferralCodeService = async (referralId, token) => {
    let url = `${SERVER_URL}/api/user/getRootCodeByReferralCode/${referralId}`
    return await axios.get(url, getAxiosHeader(token))
}

export const registerUserService = async (data, token) => {
    let url = `${SERVER_URL}/api/auth/signup`
    return await axios.post(url, data, getAxiosHeader(token))
}

export const loginUserService = async (data, token) => {debugger
    try {
        let url = `${SERVER_URL}/api/auth/login`
        const res = await axios.post(url, data, getAxiosHeader(token))
        console.log(res);
        return res;   
    } catch (error) {
        console.log(error);
    }
}

export const updateJoiningInfoService = async (data, token) => {
    let url = `${SERVER_URL}/api/user/updateJoiningDetails`
    return await axios.put(url, data, getAxiosHeader(token))
}

export const getLevelWiseIncomeDetailsService = async (level, token) => {
    let url = `${SERVER_URL}/api/user/getLevelWiseIncome/${level}`
    return await axios.get(url, getAxiosHeader(token))
}

export const changePasscodeService = async (data, token) => {
    let url = `${SERVER_URL}/api/auth/changepasscode`
    return await axios.put(url, data, getAxiosHeader(token))
}