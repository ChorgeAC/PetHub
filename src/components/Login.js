import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import "./Login.css";

const defaultLoginData = {
  userName: "",
  password: "",
};

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loginData, setLoginData] = useState(defaultLoginData);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { userName, password } = loginData;

  const handleChange = (e) => {
    const name = e.target.name;
    setLoginData({ ...loginData, [name]: e.target.value });
  };

  const login = async (formData) => {
    const { userName, password } = formData;
    if (validateInput(formData)) {
      setLoading(true);
      try {
        const response = await axios.post(`/users/login`, {
          userName: userName,
          password: password,
        });
        enqueueSnackbar("Logged in successfully", { variant: "success" });
        setLoading(false);
        setLoginData(defaultLoginData);
        navigate("/");
        persistLogin(response.data.userName);
      } catch (error) {
        if (!error.response) {
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            { variant: "error" }
          );
          setLoading(false);
          setLoginData(defaultLoginData);
        } else if (error.response.status === 400) {
          enqueueSnackbar(`${error.response.data.message}`, {
            variant: "error",
          });
          setLoading(false);
          setLoginData(defaultLoginData);
        }
      }
    }
  };
  const validateInput = (data) => {
    if (data.userName === "") {
      enqueueSnackbar("username required", { variant: "warning" });
      return false;
    }
    if (data.password === "") {
      enqueueSnackbar("password required", { variant: "warning" });
      return false;
    }
    return true;
  };
  const persistLogin = (userName) => {
    localStorage.setItem("username", userName);
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
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="userName"
            fullWidth
            placeholder="Enter Username"
            value={userName}
            onChange={handleChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
            placeholder="Enter a password"
            value={password}
            onChange={handleChange}
          />
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <Button
              className="button"
              variant="contained"
              onClick={() => login(loginData)}
            >
              LOGIN TO QKART
            </Button>
          )}
          <p className="secondary-action">
            Don’t have an account? <Link to="/sign">Register Now</Link>
          </p>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
