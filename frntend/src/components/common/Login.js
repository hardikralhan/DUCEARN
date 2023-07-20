import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {ToastError} from './Toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginUserService } from '../../services/authservices'

export const Login = (props) => {

  const dispatch = useDispatch() 

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('');
  const [open,setOpen] = useState(false);

  const navigate = useNavigate();

  const validateData = () =>{
    if(email && password){
        return true   
    } 
    else return false
  }

  const handleClick = async(event) =>{
    
    try { 

      setOpen(true)
      if(validateData()){ 
        console.log('step 1')
        let dataToSend = {} 
        dataToSend.userId = email
        dataToSend.password = password 
        let data = JSON.stringify(dataToSend);
        let res = await loginUserService(dataToSend);
        console.log( res);
        dispatch({ 
          type: 'SET_TOKEN',
          payload: res.data.result.token
        })
        dispatch({
          type: "SET_ISSHOW",
          payload: true,
        });
        props.setIsLoggedIn(true)
        setOpen(false)
        navigate("/dashboard")
        event.preventDefault();
      }else {
        ToastError("Please fill") 
        event.preventDefault() 
      }
    } catch (error) {
      console.log(error,'===')
      // ToastError(error)
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

    <div
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
       onClick={() => { handleClick() }}
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      >
        Sign in
      </button>

      <p className="text-center text-sm text-gray-500">
        No account?
        <Link className="underline" to="/register">Register Now</Link>
      </p>
    </div>
  </div>
</div>
  )
}
