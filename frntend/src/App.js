import AppRoutes from '../src/routes/AppRoutes'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';

function App() {


  useEffect(() => {
    window.scrollTo(0, 0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Toaster></Toaster>
      <>
        <AppRoutes />
        
      </>
    </>

    
  )
}

export default App
