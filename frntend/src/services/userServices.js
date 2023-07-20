import axios from "axios";
import { SERVER_URL } from "../GlobalVariable.js";

const getAxiosHeader = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
    }
}


export const getUserDetailServiceThroughToken = async (data,token) => {
    let url = `${SERVER_URL}/api/user/getUserDetails`
    return await axios.post(url, data, getAxiosHeader(token))
}

export const getBusinessHistoryService = async (token) => {
    let url = `${SERVER_URL}/api/user/getBusinessHistory`
    return await axios.get(url, getAxiosHeader(token))
}

export const getTransactionHistoryService = async (token) => {
    let url = `${SERVER_URL}/api/user/getTransactionHistory`
    return await axios.get(url, getAxiosHeader(token))
}

export const getAllTeamMemberService = async (token) => {
    let url = `${SERVER_URL}/api/user/getAllTeamMember`
    return await axios.get(url, getAxiosHeader(token))
}

export const getDirectTeamMemberService = async (token) => {
    let url = `${SERVER_URL}/api/user/getDirectTeamMember`
    return await axios.get(url, getAxiosHeader(token))
}

export const getDirectIncomeService = async (token) => {
    let url = `${SERVER_URL}/api/user/getDirectIncome`
    return await axios.get(url, getAxiosHeader(token))
}

export const depositService = async (data, token) => {
    let url = `${SERVER_URL}/api/user/deposit`
    return await axios.post(url, data, getAxiosHeader(token))
}

export const withdrawService = async (data, token) => {
    let url = `${SERVER_URL}/api/user/withdraw`
    return await axios.post(url, data, getAxiosHeader(token))
}

export const generateOtpForWithdrawService = async (data, token) => {
    let url = `${SERVER_URL}/api/user/generateOtpForWithdraw`
    return await axios.post(url, data, getAxiosHeader(token))
}

export const updateAutoTopEnabledService = async (data, token) => {
    let url = `${SERVER_URL}/api/user/updateAutoTop`
    return await axios.put(url, data, getAxiosHeader(token))
}

export const manualTopupService = async (data, token) => {
    let url = `${SERVER_URL}/api/user/manualTopup`
    return await axios.post(url, data, getAxiosHeader(token))
}

export const generateOtpForPasscodeResetService = async (data, token) => {
    let url = `${SERVER_URL}/api/user/generateOtpForPasscodeReset`
    return await axios.post(url, data, getAxiosHeader(token))
}

export const resetPasscodeService = async (data, token) => {
    let url = `${SERVER_URL}/api/user/resetPasscode`
    return await axios.put(url, data, getAxiosHeader(token))
}

export const purchaseZepXService = async (data, token) => {
    let url = `${SERVER_URL}/api/zepx/purchaseZepx`
    return await axios.post(url, data, getAxiosHeader(token))
}

export const purchaseZepXInStakingPlanService = async (data, token) => {
    let url = `${SERVER_URL}/api/zepx/purchaseZepxInStakingPlan`
    return await axios.post(url, data, getAxiosHeader(token))
}

export const checkPurchaseStatusService = async (data, token) => {
    let url = `${SERVER_URL}/api/zepx/checkPurchaseStatus`
    return await axios.post(url, data, getAxiosHeader(token))
}

export const uploadProfileImageService = async (profileImage, imageToRemove) => {
    let url = `${SERVER_URL}/zepxasset/uploadprofileimage`
    let formData = new FormData()
    formData.append('image', profileImage)
    if (imageToRemove !== undefined && imageToRemove !== '') {
        formData.append('removeImage', imageToRemove)
    }
    return await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const updateProfileImageService = async (data, token) => {
    let url = `${SERVER_URL}/api/user/updateProfileImage`
    return await axios.put(url, data, getAxiosHeader(token))
}

export const updateProfileDetailsService = async (data, token) => {
    let url = `${SERVER_URL}/api/user/updateProfileDetails`
    return await axios.put(url, data, getAxiosHeader(token))
}

export const getMemberTreeService = async (token) => {
    let url = `${SERVER_URL}/api/user/getMemberTree`
    return await axios.get(url, getAxiosHeader(token))
}





