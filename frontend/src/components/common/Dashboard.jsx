// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// // import "./Dashboard.css";
// // import Maindashboard from "./Maindashboard";
// import { useDispatch } from "react-redux";

// export default function Dashboard() {
//     const [selectedMenu, setSelectedMenu] = useState("dashboard");
//     const dispatch = useDispatch()
  
//     useEffect(() => {
//       window.scrollTo(0, 0)
//       dispatch({
//         type: "SET_ISSHOW",
//         payload: true,
//       });
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])
  
//     return (
//       <div className="mainDashboard">
//         <div className="dashboard">
//           <Sidebarmenu setSelectedMenu={setSelectedMenu} />
//         </div>
//         <div className="main">
//           {/* {selectedMenu === "dashboard" && <><Navbar />, <Maindashboard /></>} */}
//           {selectedMenu === "dashboard" && <><Navbar /></>}
//         </div>
//       </div>
//     );
//   }