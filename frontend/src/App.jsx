import { RouterProvider, createBrowserRouter } from "react-router-dom"
import {Register} from "./components/common/Register"
import {Login} from "./components/common/Login"
// import {Dashboard} from "./components/common/Dashboard"
import {PageNotFound} from "./components/common/PageNotFound"
import { Toaster } from 'react-hot-toast';

function App() {

  const router = createBrowserRouter([

    {
      path: '/',
      element: <Login></Login>
    },
    {
      path: '/register',
      element: <Register></Register>
    },
  //   // {
  //   //   path: '/dashboard',
  //   //   element: <Dashboard></Dashboard>
  //   // },
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
