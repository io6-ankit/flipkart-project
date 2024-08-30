import { Box, Paper } from "@mui/material";
import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import FLIPKART_MAIN_IMAGE from "../../assets/images/login-page-image.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { API, MESSAGES } from "../../configs/api";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import "./style.css";
const Login = () => {
  const login_img_style = {
    backgroundImage: `url(${FLIPKART_MAIN_IMAGE})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "500px",
    padding: "0",
    margin: "0",
  };
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isSubmit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    msg: "",
    isOpen: "",
    type: "",
  });
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    try {
      setLoading(true);
      if (loginData.email.length < 6 || loginData.password < 7) return;
      setSubmit(true);
      const { status, data } = await axios.post(API.LOGIN_API, {
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30,
      });
      if (status == 200) {
        setNotification({
          msg: "You have logged in successfully",
          isOpen: true,
          type: "success",
        });
        dispatch(setUserData(data));
        localStorage.setItem("userData", JSON.stringify(data));

        navigate("/homepage");
        setLoading(false);
      }
    } catch (err) {
      console.error("--Error in login process--", err);
      setLoading(false);
      setNotification({
        msg: "Something went wrong!!",
        isOpen: true,
        type: "error",
      });
    }
  };
  const handleChange = (type) => (event) => {
    setLoginData({ ...loginData, [type]: event.target.value });
  };

  // <p></p>
  const emailErr = isSubmit && loginData?.email.length <= 5;
  const pwErr = isSubmit && loginData?.password.length <= 6;
  return (
    <>
      <Box className="login-container">
        <Paper elevation={20} className="login-paper">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} className="fk-left-sec">
              <Box style={login_img_style}></Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} className="fk-right-sec">
              <Typography variant="h4" sx={{ margin: "20px 0 10px 0px" }}>
                Login
              </Typography>
              <Typography variant="subtitle" sx={{ margin: "20px 0 0 0" }}>
                Get access to your orders, Wishlist and recommendation
              </Typography>

              <Typography variant="body1" sx={{ margin: "30px 0 0 0" }}>
                Enter Email*
              </Typography>
              <TextField
                id="outlined-error-helper-text"
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon
                        style={{ color: emailErr ? "red" : "purple" }}
                      />
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange("email")}
                error={emailErr}
                helperText={emailErr && "Please Enter Valid Email"}
              />

              <Typography variant="body1" sx={{ margin: "20px 0 0 0" }}>
                Enter Password*
              </Typography>
              <TextField
                id="outlined-error-helper-text"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                onChange={handleChange("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handlePassword}>
                        {showPassword ? (
                          <VisibilityIcon
                            style={{ color: pwErr ? "red" : "purple" }}
                          />
                        ) : (
                          <VisibilityOffIcon
                            style={{ color: pwErr ? "red" : "purple" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={pwErr}
                helperText={pwErr && "Please Enter Valid Password"}
              />

              <Box className="btn-container">
                <Tooltip
                  title={
                    (loginData.email.length < 6 &&
                      "Please enter valid Email") ||
                    (loginData.password.length < 7 &&
                      "Please enter valid Password")
                  }
                >
                  <span>
                    <Chip
                      className="chip-btn"
                      label="Login"
                      variant="filled"
                      color="primary"
                      onClick={handleLogin}
                      disabled={
                        loginData.email.length < 6 || loginData.password < 7
                      }
                    />
                  </span>
                </Tooltip>
                <Chip
                  className="chip-btn"
                  label="Sign Up"
                  variant="contained"
                  color="primary"
                  onClick="signup"
                />
              </Box>
              <Typography
                variant="subtitle"
                sx={{ margin: "29px 0 0 4px", display: " block" }}
              >
                We no longer support login via social Account
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};
export default Login;
