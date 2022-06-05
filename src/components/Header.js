import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ hasHiddenAuthButtons }) => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const backToProduct = () => {
    navigate("/");
  };

  const backToLoginPage = () => {
    navigate("/login");
  };

  const backToRegisterPage = () => {
    navigate("/sign");
  };

  const User = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        <Avatar alt={username} src="/public/avatar.png" />
        <h4 style={{ padding: "0 0.5rem" }}>{username}</h4>
        <Button variant="outlined" onClick={logout}>
          Logout
        </Button>
      </Box>
    );
  };

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logoImg.jpg" alt="logo"></img>
        <Typography variant="h5">PetHub</Typography>
      </Box>
      <Box>
        {username ? (
          <User />
        ) : hasHiddenAuthButtons ? (
          <Button
            onClick={backToProduct}
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
          >
            Back to explore
          </Button>
        ) : (
          <Box>
            <Button
              variant="outlined"
              onClick={backToLoginPage}
              style={{ margin: "0.5rem" }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={backToRegisterPage}
              style={{ margin: "0.5rem" }}
            >
              Sign In
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
