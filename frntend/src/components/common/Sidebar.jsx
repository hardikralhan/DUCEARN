import React, { useState } from "react";
import Avtar from "../../assests/images/avtar.png";
import "./Sidebar.css";
import GridViewIcon from "@mui/icons-material/GridView";
import Person2Icon from "@mui/icons-material/Person2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ParkIcon from '@mui/icons-material/Park';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LockClockOutlined } from "@mui/icons-material";
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
// import { BASE_FILE_PATH } from "../../GlobalVariable";

export const Sidebar = (setSelectedMenu) => {
    const [showSidebar, setShowsidebar] = useState(false);
  const [referList, setOpenreferlist] = useState(false);
  const [incomeList, setOpenincomelist] = useState(false);
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userReducer);
//   const navbarData = useSelector((state) => state.statusReducer);

  const dispatch = useDispatch();

  const handleSignOutButton = () => {
    try {
      dispatch({
        type: "CLEAR_TOKEN",
      });
      navigate("/login");
    } catch (error) { }
  };

  const handleMenuButton = () => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: !navbarData.status,
    });
  };
  let navbarData={}
  navbarData.status = true;
    return (
        <>
        {navbarData.status ? (
          <div className="sidebarmenuu" style={{ display: "flex", position: 'absolute', zIndex: '1000' }}>
            <div className="sidebarmenuFordesktop">
              <div className="sidebarmenuFordesktop__avtarDiv">
                <div>
                  {/* <img src={userDetails.profileImage !== "" ? BASE_FILE_PATH + userDetails.profileImage : Avtar} alt="Failed To Load" className="sidebarmenu__avtarImg" /> */}
                  <h1 style={{ color: "white" }}>
                    {userDetails?.referralId}
                  </h1>
                  {/* <Rating name="read-only" value={userDetails.rank} size="small" max={12} readOnly /> */}
                </div>
  
                <div>
                  <CloseIcon className="closeIcon" onClick={() => handleMenuButton()} />
                </div>
              </div>
  
              <div
                onClick={() => {
                  setSelectedMenu("dashboard");
                  handleMenuButton();
                }}
                className="sidebarmenu__box"
              >
                <GridViewIcon className="sidebarmenu__box__icons" />
                <p className="sidebarmenu__box__headings">Dashboard</p>
              </div>
  
              <div onClick={() => {
                handleMenuButton();
                setSelectedMenu("profile");
              }
              }
  
                className="sidebarmenu__box">
                <Person2Icon className="sidebarmenu__box__icons" />
                <p className="sidebarmenu__box__headings">Profile</p>
              </div>
  
              <div
                className="sidebarmenu__box"
                onClick={() => {
                  referList ? setOpenreferlist(false) :
                    setOpenreferlist(true);
                  setOpenincomelist(false);
  
                }}
              >
                <GroupsIcon className="sidebarmenu__box__icons" />
                <p className="sidebarmenu__box__headings">Team List</p>
                <ArrowDropDownIcon className="sidebarmenu__box__icons" />
              </div>
  
              {referList ? (
                <div className="sidebarmenu__box__teamList__details">
                  <p
                    onClick={() => {
                      setSelectedMenu("referrList");
                      handleMenuButton()
                    }}
                  >
                    Referrals
                  </p>
  
                  <p
                    onClick={() => {
                      setSelectedMenu("allTeamList");
                      handleMenuButton()
                    }}
                  >
                    Team List
                  </p>
                </div>
              ) : null}
  
              <div className="sidebarmenu__box">
                <BusinessIcon className="sidebarmenu__box__icons" />
                <p
                  onClick={() => {
                    setSelectedMenu("businessHistory");
                    handleMenuButton()
                  }}
                  className="sidebarmenu__box__headings"
                >
                  Business History
                </p>
              </div>
  
              <div
                className="sidebarmenu__box"
                onClick={() => {
                  incomeList ? setOpenincomelist(false) :
                    setOpenincomelist(true);
                  setOpenreferlist(false)
                }}
              >
                <MonetizationOnIcon className="sidebarmenu__box__icons" />
                <p className="sidebarmenu__box__headings">Income Details</p>
                <ArrowDropDownIcon className="sidebarmenu__box__icons" />
              </div>
  
              {incomeList ? (
                <div className="sidebarmenu__box__teamList__details">
                  <p
                    onClick={() => {
                      setSelectedMenu("totalIncome");
                      handleMenuButton()
                    }}
                  >
                    Total Income
                  </p>
                  <p
                    onClick={() => {
                      setSelectedMenu("directIncome");
                      handleMenuButton()
                    }}
                  >
                    Direct Income
                  </p>
                  <p
                    onClick={() => {
                      setSelectedMenu("levelIncome");
                      handleMenuButton()
                    }}
                  >
                    Level Income
                  </p>
                </div>
              ) : null}
  
              <div className="sidebarmenu__box">
                <ReceiptLongIcon className="sidebarmenu__box__icons" />
                <p
                  onClick={() => {
                    setSelectedMenu("transactionHistory");
                    handleMenuButton()
                  }}
                  className="sidebarmenu__box__headings"
                >
                  Transaction History
                </p>
              </div>
  
              <div className="sidebarmenu__box">
                <ParkIcon className="sidebarmenu__box__icons" />
                <p
                  onClick={() => {
                    setSelectedMenu("memberTree");
                    handleMenuButton();
                  }}
                  className="sidebarmenu__box__headings"
                >
                  Member Tree
                </p>
              </div>
  
              <div className="sidebarmenu__box">
                <LockClockOutlined className="sidebarmenu__box__icons" />
                <p
                  onClick={() => {
                    setSelectedMenu("changePasscode");
                    handleMenuButton()
                  }}
                  className="sidebarmenu__box__headings"
                >
                  Change Passcode
                </p>
              </div>
  
              <button
                onClick={() => {
                  handleSignOutButton();
                }}
                className="sidebarmenu__signOutbtn"
              >
  
                Sign Out
              </button>
            </div>
  
  
  
            {showSidebar ? (
              <ArrowForwardIcon
                className="sidebarMenu__arrowbuttons"
                style={{ color: "white" }}
                onClick={() => {
                  showSidebar ? setShowsidebar(false) : setShowsidebar(true);
                }}
              />
            ) : (
              <ArrowBackIcon
                className="sidebarMenu__arrowbuttons"
                style={{ color: "white" }}
                onClick={() => {
                  showSidebar ? setShowsidebar(false) : setShowsidebar(true);
                }}
              />
            )}
          </div>
        ) : null}
  
        <div className="sidebarmenuudesktop" style={{ display: "flex" }}>
          <div className="sidebarmenuFordesktop">
            <div className="sidebarmenuFordesktop__avtarDiv">
              {/* <img src={userDetails.profileImage !== "" ? BASE_FILE_PATH + userDetails.profileImage : Avtar} alt="Failed To Load" className="sidebarmenu__avtarImg" /> */}
              <h1 style={{ color: "white" }}>
                {userDetails?.referralId}
              </h1>
              {/* <h6><Rating name="read-only" value={userDetails.rank} size="small" max={12} readOnly /></h6> */}
            </div>
  
            <div
              onClick={() => {
                setSelectedMenu("dashboard");
  
              }}
              className="sidebarmenu__box"
            >
              <GridViewIcon className="sidebarmenu__box__icons" />
              <p className="sidebarmenu__box__headings">Dashboard</p>
            </div>
  
            <div onClick={() => { setSelectedMenu("profile"); }}
              className="sidebarmenu__box">
              <Person2Icon className="sidebarmenu__box__icons" />
              <p className="sidebarmenu__box__headings">Profile</p>
            </div>
  
            <div
              className="sidebarmenu__box"
              onClick={() => {
                referList ? setOpenreferlist(false) :
                  setOpenreferlist(true);
                setOpenincomelist(false);
              }}
            >
              <GroupsIcon className="sidebarmenu__box__icons" />
              <p className="sidebarmenu__box__headings">Team List</p>
              <ArrowDropDownIcon className="sidebarmenu__box__icons" />
            </div>
  
            {referList ? (
              <div className="sidebarmenu__box__teamList__details">
                <p
                  onClick={() => {
                    setSelectedMenu("referrList");
  
                  }}
                >
                  Referrals
                </p>
  
                <p
                  onClick={() => {
                    setSelectedMenu("allTeamList");
  
                  }}
                >
                  Team List
                </p>
              </div>
            ) : null}
  
            <div className="sidebarmenu__box">
              <BusinessIcon className="sidebarmenu__box__icons" />
              <p
                onClick={() => {
                  setSelectedMenu("businessHistory");
  
                }}
                className="sidebarmenu__box__headings"
              >
                Business History
              </p>
            </div>
  
            <div
              className="sidebarmenu__box"
              onClick={() => {
                incomeList ? setOpenincomelist(false) :
                  setOpenincomelist(true);
                setOpenreferlist(false)
              }}
            >
              <MonetizationOnIcon className="sidebarmenu__box__icons" />
              <p className="sidebarmenu__box__headings">Income Details</p>
              <ArrowDropDownIcon className="sidebarmenu__box__icons" />
            </div>
  
            {incomeList ? (
              <div className="sidebarmenu__box__teamList__details">
                <p
                  onClick={() => {
                    setSelectedMenu("totalIncome");
  
                  }}
                >
                  Total Income
                </p>
                <p
                  onClick={() => {
                    setSelectedMenu("directIncome");
  
                  }}
                >
                  Direct Income
                </p>
                <p
                  onClick={() => {
                    setSelectedMenu("levelIncome");
                  }}
                >
                  Level Income
                </p>
              </div>
            ) : null}
  
            <div className="sidebarmenu__box">
              <ReceiptLongIcon className="sidebarmenu__box__icons" />
              <p
                onClick={() => {
                  setSelectedMenu("transactionHistory");
  
                }}
                className="sidebarmenu__box__headings"
              >
                Transaction History
              </p>
            </div>
  
            <div className="sidebarmenu__box">
              <ParkIcon className="sidebarmenu__box__icons" />
              <p
                onClick={() => {
                  setSelectedMenu("memberTree");
                }}
                className="sidebarmenu__box__headings"
              >
                Member Tree
              </p>
            </div>
  
  
  
            <div className="sidebarmenu__box">
              <LockClockOutlined className="sidebarmenu__box__icons" />
              <p
                onClick={() => {
                  setSelectedMenu("changePasscode");
  
                }}
                className="sidebarmenu__box__headings"
              >
                Change Passcode
              </p>
            </div>
  
  
  
  
            <button
              onClick={() => {
                handleSignOutButton();
              }}
              className="sidebarmenu__signOutbtn"
            >
  
              Sign Out
            </button>
          </div>
  
  
        </div>
  
      </>

    );
}