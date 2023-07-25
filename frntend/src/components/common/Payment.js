import React, { useEffect, useState } from 'react'
import './Payment.css'
// import Logo from "../assets/images/logolight.png";
import { useLocation } from "react-router-dom";
// import { updateJoiningInfoService } from '../services/AuthServices';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
// import { ToastError } from "../components/common/Toast";
// import { WalletConnect } from '../blockchain/contract/walletConnect';
// import { Payment_Busd } from '../blockchain/contract/payment';

export function Payment() { 
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const { state } = useLocation();

  const [currency, setCurrency] = useState("busd");

  const handleCurrencyChange = () => {
    if(currency == 'busd'){
        return state?.amount
    }
    else if(currency == 'du'){
        // du is 14 for 1 busd 1 du = 1/14 busd
        return state?.amount/14
    }else if(currency == 'bnb'){
        // du is 14 for 1 busd 1 du = 1/14 busd
        return state?.amount/14
    } 
  }
  




  useEffect(() => {
    window.scrollTo(0, 0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    //   <Backdrop
    //     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //     open={isLoading}
    //   >
    //     <CircularProgress color="inherit" />
    //   </Backdrop>

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
        <div className="max-w-7xl mx-auto ">
            <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 "></div>
            <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"></path>
                </svg>
                <div className="space-y-2">
                    <div className='p-10'>
                        {/* <img src={Logo} alt="Failed To Load" className="payment__logo" /> */}
                        <p className='m-1' style={{ color: '#646e82' }}>Email: <b className='text-xl'>{state?.email}</b></p>
                        <p className='m-1' style={{ color: '#646e82' }}>Package: <b className='text-xl'>{state?.package}</b></p>
                        <p className='m-1' style={{ color: '#646e82' }}>
                            Total Payable Amount: <b className='text-xl'>{state?.amount} BUSD</b>
                        </p>
                        <p className='m-1'>Please share the screenshot of payment to activate your id on </p><a className='text-xl underline mx-1' href='hardikralhan66@gmail.com'>hardikralhan66@gmail.com</a>
                        {/* <p className='block text-indigo-400 group-hover:text-slate-800 transition duration-200 text-xl m-1'><Link to='/'>Login</Link> --</p> */}
                        <p></p>
                        
                        <select
                            // value={currency}
                            // onChange={(e) => {
                            //     setCurrency(e.target.value);
                            //     handleCurrencyChange(e.target.value);
                            // }}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md px-5 py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3"
                        >
                        
                        <option value="busd">BUSD</option>
                        <option value="du">DU COIN </option>
                        <option value="bnb">BNB </option>
                        </select>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>


  )
}
