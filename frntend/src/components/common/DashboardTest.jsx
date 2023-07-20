import React, { useState } from 'react'
import {Card, CardBody, Col, Row } from 'reactstrap';
import {Maindashboard} from "./Maindashboard";
import {Sidebar} from "./Sidebar";
import "./Dashboard.css";

export const  Dashboard = () => {debugger

    const [selectedMenu ,setSelectedMenu ] = useState('dashboard')
  return (
    <div className="mainDashboard">
        <div className="dashboard">
            <Sidebar setSelectedMenu={setSelectedMenu}/>
        </div>
        <div className="main">
            {selectedMenu === 'dashboard' && <Maindashboard/>}
            {selectedMenu === '' && <Maindashboard/>}
        </div>
    </div>
    
  );
}

