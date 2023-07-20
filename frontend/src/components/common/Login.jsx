import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {ToastError} from './Toast'
import { useDispatch } from 'react-redux'
import { loginUserService } from '../../services/authServices'
import axios from 'axios'

export default function Login(){

  const dispatch = useDispatch() 

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('');
  const [open,setOpen] = useState(false);


  const validateData = () =>{
    if(email && password) return true 
    else false;
  }
  const handleClick = async(e) =>{ debugger
    try { 
      setOpen(true)
      if(validateData()){ 
        let dataToSend = {} 
        dataToSend.userId = email
        dataToSend.password = password 
        let data = JSON.stringify(dataToSend);
        // let res = await loginUserService(dataToSend)
        let response = await fetch('http://localhost:5000/api/auth/login', {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Request-":"http://localhost:5000",
          "Access-Control-Allow-Origin": "*"
        },
        body: data, // body data type must match "Content-Type" header
        })
        console.log( response);
        dispatch({ 
          type: 'SET_TOKEN',
          payload: res.data.result.token
        })
        debugger
        dispatch({
          type: "SET_ISSHOW",
          payload: true,
        });
        // setIsLoggedIn(true)
        setOpen(false)
        navigate("/dashboard")
        e.preventDefault()
      }else {
        ToastError("Please fill") 
        e.preventDefault() 
      }
    } catch (error) {
      ToastError(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
//     /*
//   Heads up! 👋

//   Plugins:
//     - @tailwindcss/forms
// */

<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
      Get started today
    </h1>

    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt
      dolores deleniti inventore quaerat mollitia?
    </p>

    <form
      action=""
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
      <p className="text-center text-lg font-medium">Sign in to your account</p>

      <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
                <input 
                    onChange={(e)=> {setEmail(e.target.value)}}
                    value={email}
                    name= "email"
                    type="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                />
            </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
            name= "password"
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
          />
        </div>
      </div>

      <button
        onClick={handleClick}
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      >
        Sign in
      </button>

      <p className="text-center text-sm text-gray-500">
        No account?
        <Link className="underline" to="/register">Register Now</Link>
      </p>
    </form>
  </div>
</div>
  )
}
