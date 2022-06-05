import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import "./sign.css";

const defaultuserdata = {
  username: "",
  password: "",
  email: "",
};

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState(defaultuserdata);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { username, password, email } = userData;

  const handleChange = (e) => {
    const name = e.target.name;
    setUserData({ ...userData, [name]: e.target.value });
  };

  const register = async (formData) => {
    const { username, password, email } = formData;
    if (validateInput(formData)) {
      setLoading(true);
      try {
        const response = await axios.post(`/users/register`, {
          userName: username,
          email: email,
          password: password,
        });
        console.log(response);
        enqueueSnackbar("Registeration Successfully", { variant: "success" });
        setLoading(false);
        setUserData(defaultuserdata);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        setUserData(defaultuserdata);
      }
    }
  };

  const validateInput = (data) => {
    if (data.username === "") {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }
    if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (data.password === "") {
      enqueueSnackbar("Password is required field", { variant: "warning" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (data.email === "") {
      enqueueSnackbar("Email is required field", { variant: "warning" });
      return false;
    }
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Sign In</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={username}
            onChange={handleChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={password}
            onChange={handleChange}
          />
          <TextField
            id="email"
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={email}
            onChange={handleChange}
          />
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <Button
              onClick={() => register(userData)}
              className="button"
              variant="contained"
            >
              Register Now
            </Button>
          )}
          <p className="secondary-action">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
