import React, { useState } from 'react'
import {Card, CardBody, Col, Row } from 'reactstrap';
import boxlogo1 from "../../assests/images/boxlogo1.png";
import bustboxlogo2 from "../../assests/images/bustboxlogo2.png";
import referboxlogo3 from "../../assests/images/referboxlogo3.png";
import downlineboxlogo4 from "../../assests/images/downlineboxlogo4.png";
import directboxlogo5 from "../../assests/images/directboxlogo5.png"
import totalboxlogo6 from "../../assests/images/totalboxlogo6.png"
import "./Maindashboard.css";


export const Maindashboard = () => { debugger
    return(
        <div>
        <div className="mainDashboard__firstDiv">
          <div className="mainDashboard__firstDiv__leftBox">
            <p > WALLET</p>
            <p className="wallet__count">
            {/* ${userDetails.walletAmount.toFixed(2)} */}
            </p>

          </div>

          <div className="mainDashboard__firstDiv__rightBox">
            <div className="mainDashboard__firstDiv__rightBox_details">
              {/* <p onClick={() => { setOpenDepositModal(true); setBlur(true) }}>Deposit</p> */}
              <p>Deposit</p>
              {/* <p onClick={() => { withdrawButtonHandler() }} className='withdraw'>Withdraw</p> */}
              <p>Withdraw</p>
            </div>

            {/* <div className="mainDashboard__firstDiv__rightBox__autoTouup">
              <div>
                <span>Auto TopUp Enabled: </span>
                <Switch
                  checked={userDetails.autoTopupEnabled}
                  onChange={() => { updateAutoTopup() }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>

              <button onClick={() => { upgradePlanButtonHandler() }} className='upgradePlan'>Upgrade Plan</button>
            </div> */}
          </div>
        </div>

        <div className="mainDashboard__secondDiv__boxes">
          <div className="mainDashboard__secondDiv__boxes__firstRow">
            <div className="mainDashboard__secondDiv__boxes__firstRow__box">
              <img src={boxlogo1} alt="Failed To Load" className='mainDashboard__secondDiv__boxes__firstRow__box__img' />

              <div>
                <p className="paragraph_color">Wallet Balance</p>
                <p className="boxCount">
                  {/* {userDetail?.zepxBalance ? userDetail?.zepxBalance: 0} */}
                </p>
              </div>

            </div>
            <div className="mainDashboard__secondDiv__boxes__firstRow__box">
              <img src={bustboxlogo2} alt="Failed To Load" className='mainDashboard__secondDiv__boxes__firstRow__box__img' />
              <div>
                <p className="paragraph_color">BUSD</p>
                {/* <p className="boxCount"> {userDetail?.joiningDetails?.selectedPlan
                  ? calculateJoiningAmount(
                    userDetail?.joiningDetails?.selectedPlan
                  )
                  : 0}</p> */}
              </div>

            </div>
            <div className="mainDashboard__secondDiv__boxes__firstRow__box">
              <img src={referboxlogo3} alt="Failed To Load" className='mainDashboard__secondDiv__boxes__firstRow__box__img' />
              <div>
                <p className="paragraph_color">REFERRAL MEMBERS</p>
                {/* <p className="boxCount"> {userDetail?.referralMembers ? userDetail?.referralMembers : 0}</p> */}
              </div>

            </div>
          </div>

          <div className="mainDashboard__secondDiv__boxes__secondRow">
            <div className="mainDashboard__secondDiv__boxes__secondRow_box">
              <img src={totalboxlogo6} alt="Failed To Load" className="mainDashboard__secondDiv__boxes__secondRow_box__img" />
              <div>
                <p className="paragraph_color">TOTAL INCOME</p>
                {/* <p className="boxCount"> {userDetail?.totalIncome ? userDetail?.totalIncome.toFixed(2) : 0} */}
                {/* </p> */}
              </div>
            </div>
            <div className="mainDashboard__secondDiv__boxes__secondRow_box">
              <img src={downlineboxlogo4} alt="Failed To Load" className="mainDashboard__secondDiv__boxes__secondRow_box__img" />
              <div>
                <p className="paragraph_color">DOWNLINE MEMBERS</p>
                <p className="boxCount">
                  {/* {userDetail?.totalTeamMembers
                    ? userDetail.totalTeamMembers
                    : 0} */}
                </p>
              </div>
            </div>
            <div className="mainDashboard__secondDiv__boxes__secondRow_box">
              <img src={directboxlogo5} alt="Failed To Load" className="mainDashboard__secondDiv__boxes__secondRow_box__img" />
              <div>
                <p className="paragraph_color">DIRECT INCOME</p>
                <p className="boxCount">
                  {/* {userDetail?.directIncome
                    ? userDetail?.directIncome.toFixed(2)
                    : 0} */}
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
} 