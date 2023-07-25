import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import './Team.css'

export const Team = () => { 
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const columns = [
//     { field: "id", headerName: "Id" },
//     {
//       field: "name",
//       headerName: "Name",
//       width: 200,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "age",
//       headerName: "Age",
//       type: "number",
//       headerAlign: "left",
//       align: "left",
//     },
//     { field: "phone", headerName: "Phone Number", width: 100 },
//     { field: "email", headerName: "Email", width: 200 },
//     {
//       field: "access",
//       headerName: "Access Llvel",
//       width: 100,
//       renderCell: ({ row: { access } }) => {
//         return (
//           <Box
//             width="100%"
//             m="0 auto"
//             p="5px"
//             display="flex"
//             justifyContent="center"
//             backgroundColor={
//               access === "admin"
//                 ? colors.greenAccent[600]
//                 : colors.greenAccent[800]
//             }
//             borderRadius="4px"
//           >
//             {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
//             {access === "manager" && <SecurityOutlinedIcon />}
//             {access === "user" && <LockOpenOutlinedIcon />}
//             <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
//               {access}
//             </Typography>
//           </Box>
//         );
//       },
//     },
//   ];
  return (

<div class="container">
    <div class="row">
        <div class="col-12 mb-3 mb-lg-5">
            <div class="overflow-hidden card table-nowrap table-card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">New customers</h5>
                    <a href="#!" class="btn btn-light btn-sm">View All</a>
                </div>
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead class="small text-uppercase bg-body text-muted">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Country</th>
                                <th>Payment method</th>
                                <th>Created Date</th>
                                <th class="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="align-middle">
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="avatar sm rounded-pill me-3 flex-shrink-0" alt="Customer"/>
                                        <div>
                                            <div class="h6 mb-0 lh-1">Mark Voldov</div>
                                        </div>
                                    </div>
                                </td>
                                <td>mvoges@email.com</td>
                                <td> <span class="d-inline-block align-middle">Russia</span></td>
                                <td><span>****6231</span></td>
                                <td>21 Sep, 2021</td>
                                <td class="text-end">
                                    <div class="drodown">
                                        <a data-bs-toggle="dropdown" href="#" class="btn p-1" aria-expanded="false">
                                  <i class="fa fa-bars" aria-hidden="true"></i>
                                </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a href="#!" class="dropdown-item">View Details</a>
                                            <a href="#!" class="dropdown-item">Delete user</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="align-middle">
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" class="avatar sm rounded-pill me-3 flex-shrink-0" alt="Customer"/>
                                        <div>
                                            <div class="h6 mb-0 lh-1">Topias Kantola</div>
                                        </div>
                                    </div>
                                </td>
                                <td>topiaskantola@email.com</td>
                                <td> <span class="d-inline-block align-middle">Brazil</span></td>
                                <td><span>****@mail.com</span></td>
                                <td>21 Sep, 2021</td>
                                <td class="text-end">
                                    <div class="drodown">
                                        <a data-bs-toggle="dropdown" href="#" class="btn p-1">
                                  <i class="fa fa-bars" aria-hidden="true"></i>
                                </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a href="#!" class="dropdown-item">View Details</a>
                                            <a href="#!" class="dropdown-item">Delete user</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="align-middle">
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="avatar sm rounded-pill me-3 flex-shrink-0" alt="Customer"/>
                                        <div>
                                            <div class="h6 mb-0 lh-1">Anaiah Whitten</div>
                                        </div>
                                    </div>
                                </td>
                                <td>anaiahwhitten@email.com</td>
                                <td>
                                    <span class="d-inline-block align-middle">Poland</span>
                                </td>
                                <td><span>****0014</span></td>
                                <td>12 June, 2021</td>
                                <td class="text-end">
                                    <div class="drodown">
                                        <a data-bs-toggle="dropdown" href="#" class="btn p-1">
                                  <i class="fa fa-bars" aria-hidden="true"></i>
                                </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a href="#!" class="dropdown-item">View Details</a>
                                            <a href="#!" class="dropdown-item">Delete user</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="align-middle">
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar4.png" class="avatar sm rounded-pill me-3 flex-shrink-0" alt="Customer"/>
                                        <div>
                                            <div class="h6 mb-0 lh-1">Wyatt Morris</div>
                                        </div>
                                    </div>
                                </td>
                                <td>wyattmorris@email.com</td>
                                <td>
                                    <span class="d-inline-block align-middle">Kenya</span>
                                </td>
                                <td><span>****8715</span></td>
                                <td>04 June, 2021</td>
                                <td class="text-end">
                                    <div class="drodown">
                                        <a data-bs-toggle="dropdown" href="#" class="btn p-1">
                                 <i class="fa fa-bars" aria-hidden="true"></i>
                                </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a href="#!" class="dropdown-item">View Details</a>
                                            <a href="#!" class="dropdown-item">Delete user</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="align-middle">
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar5.png" class="avatar sm rounded-pill me-3 flex-shrink-0" alt="Customer"/>
                                        <div>
                                            <div class="h6 mb-0 lh-1">Eliana Stout</div>
                                        </div>
                                    </div>
                                </td>
                                <td>elianastout@email.com</td>
                                <td>
                                    <span class="d-inline-block align-middle">Usa</span>
                                </td>
                                <td><span>****1010</span></td>
                                <td>01 June, 2021</td>
                                <td class="text-end">
                                    <div class="drodown">
                                        <a data-bs-toggle="dropdown" href="#" class="btn p-1">
                                  <i class="fa fa-bars" aria-hidden="true"></i>
                                </a>
                                        <div class="dropdown-menu dropdown-menu-end">
                                            <a href="#!" class="dropdown-item">View Details</a>
                                            <a href="#!" class="dropdown-item">Delete user</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};


