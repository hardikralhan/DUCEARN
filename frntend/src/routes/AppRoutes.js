import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {Login} from '../components/common/Login'
import {PageNotFound} from '../components/common/PageNotFound'
import { Register } from "../components/common/Register";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";

import Topbar from "../global/Topbar";

import Dashboard from "../components/common/Dashboard";

export default function AppRoutes() {

  // states
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [theme, colorMode] = useMode();

  const getTokenData = useSelector(state => state.tokenReducer)

  // function to verify isUserLoggedIn
  const isUserLoggedIn = () => {
    try {
      let token = getTokenData.token
      if (!token) {
        setIsLoggedIn(false)
      }
      else {
        setIsLoggedIn(true)
      }
    } catch (error) {
      setIsLoggedIn(false)
    }
  }



  useEffect(() => {
    isUserLoggedIn()
    window.scrollTo(0, 0)


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ( 
    <>
      <Suspense fallback={
        <div style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* <Lottie animationData={loaderData} loop={true} /> */}
        </div>
      } >

        {isLoggedIn && (
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <MyProSidebarProvider>
                <div style={{ height: "100%", width: "100%" }}>
                  <main>
                    <Topbar />
                    <Routes>
                      <Route exact path="/dashboard" element={<Dashboard />} />
                      <Route exact path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                      <Route exact path="/register" element={<Register />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </main>
                </div>
              </MyProSidebarProvider>
            </ThemeProvider>
          </ColorModeContext.Provider>
        )}

        {!isLoggedIn && (
          <Routes>
            <Route exact path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}

      </Suspense>


    </>

  )
}
