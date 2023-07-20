import { RouterProvider, createBrowserRouter } from "react-router-dom"
import {Register} from "./components/common/Register"
import {Login} from "./components/common/Login"
// import {Dashboard} from "./components/common/Dashboard"
import {PageNotFound} from "./components/common/PageNotFound"
import { Toaster } from 'react-hot-toast';

import { Routes, Route } from "react-router-dom";

function App() {
  const re = async (e) =>{ debugger
    let dataToSend = {} 
        dataToSend.userId = "hardik@gmail.com"
        dataToSend.password = "test"; 

    let data = JSON.stringify(dataToSend);

        // console.log(JSON.stringify(dataToSend));
    try{ 
   let response = await fetch('http://localhost:5000/api/auth/login', 
   {method: "POST",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "Access-Control-Request-":"http://localhost:5000"
},  
body:data
})
console.log(response.body);
console.log(response)
}

  catch(err){
    console.error(err);
  }
  }
  re();

  const router = createBrowserRouter([

    {
      path: '/',
      element: <Login></Login>
    },
    {
      path: '/register',
      element: <Register></Register>
    },
    // {
    //   path: '/dashboard',
    //   element: <Dashboard></Dashboard>
    // },
    {
      path: '/resetPassword',
      element: <div>Reset password Router</div>
    },
    {
      path: '*',
      element: <PageNotFound></PageNotFound>
    },
  ])

  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
      <p>Hellodwgredsa</p>
      </main>
  )}

export default App
