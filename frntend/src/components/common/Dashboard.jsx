import {
    Box,
    Button,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import Grid from "@mui/material/Unstable_Grid2";
  import { tokens } from "../../theme";
  import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
  import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
  import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
  import PersonAddIcon from "@mui/icons-material/PersonAdd";
  import TrafficIcon from "@mui/icons-material/Traffic";
  import Header from "../../global/components/Header";
  import StatBox from "../../global/components/StatBox";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { getUserDetailServiceThroughToken} from "../../services/userServices";
import { useState, useEffect } from "react";
  
  const Dashboard = () => { 
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);

    const getTokenData = useSelector((state) => state.tokenReducer);
    const [userDetail, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

  //function to get user details
  const getUserDetails = async () => { 
    try {
      setIsLoading(true);
      console.log("use details 1-- "+userDetail);
      console.log(getTokenData);
      let res = await getUserDetailServiceThroughToken(getTokenData,getTokenData.token);
      console.log(res.data.result)
      if (res?.data?.result?.status === 0) {
        navigate("/payment", {
          state: {
            email: res.data.result.email,
            amount: res.data.result.joiningDetails.selectedPlan
          },
        });
      }

      dispatch({
        type: "SET_WALLET_AMOUNT",
        payload: res.data.result.walletDetails.walletBalance,
      });
      dispatch({
        type: "SET_TOTAL_INCOME_THROUGH_LEVEL",
        payload: res.data.result.totalIncomeDetails.throughLevel,
      });
      dispatch({
        type: "SET_TOTAL_INCOME_THROUGH_OWN_REFERRAL",
        payload: res.data.result.totalIncomeDetails.throughOwnReferral,
      });
      console.log("use details 1-- "+userDetail);
      setUserDetails(res.data.result);
      console.log("use details 2-- "+userDetail);
      console.log(userDetail.walletDetails);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    
    return (
      // {isLoading}
      <Box m="20px">
        {/* HEADER */}
  
        <Box
          display={smScreen ? "flex" : "block"}
          flexDirection={smScreen ? "row" : "column"}
          justifyContent={smScreen ? "space-between" : "start"}
          alignItems={smScreen ? "center" : "start"}
          m="10px 0"
        >
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
  
        {/* GRID & CHARTS */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title= {userDetail?.walletDetails?.walletBalance}               // user wallet amount
                subtitle="Wallet Balance"
                icon={
                  <AccountBalanceWalletIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={userDetail?.totalIncomeDetails?.throughLevel}
                subtitle="Total Income Through Level"
                icon={
                  <PointOfSaleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title= {userDetail?.totalIncomeDetails?.throughOwnReferral}
                subtitle="Total Income Through Own Referral"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={userDetail?.walletDetails?.lostBalance}
                subtitle="Lost Income"
                progress="0.80"
                increase="+43%"
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Grid>
  
          <Grid
            xs={12}
            sm={12}
            md={8}
            lg={8}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={12}>
              <Box backgroundColor={colors.primary[400]}>
                <Box
                  mt="25px"
                  p="0 30px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                      Referral ID Generated
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="800"
                      color={colors.greenAccent[500]}
                    >
                      {userDetail?.userDetails?.ownReferralCode}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton>
                      <DownloadOutlinedIcon
                        sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                      />
                    </IconButton>
                  </Box>
                </Box>
                <Box height="250px" m="-20px 0 0 0">
                  {/* <LineChart isDashboard={true} /> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default Dashboard;
  