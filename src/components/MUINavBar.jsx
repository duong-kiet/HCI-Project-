import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import React from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/i.jpg";

export const MUINavBar = () => {
  const navigate = useNavigate();

  function navigateToNews(e) {
    e.preventDefault();
    navigate("/news");
  }
  function navigateToHome(e) {
    e.preventDefault();
    navigate("/home-page");
  }

  function navigateToProfile(e) {
    e.preventDefault();
    navigate("/protected");
  }
  function navigateToCall(e) {
    e.preventDefault();
    navigate("/Videocall");
  }
  function navigateToMusic(e) {
    e.preventDefault();
    navigate("/Music");
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#ffffff" }}>
      <Toolbar sx={{color: "#a75c00"}}>
        <IconButton
            tabIndex={"-1"}
            size="large"
            edge="start"
            color="bg-blue-900"
            aria-label="logo"
            className="w-30"
            sx={{paddingRight: 0}}
        >
          <img
              src={Logo}
              alt="Logo"
              style={{ width: "40px", height: "40px" }}
          />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          <IconButton
            tabIndex={"-1"}
            color="inherit"
            onClick={navigateToHome}
            className="h-10"
            sx={{fontSize: 35, fontWeight: "bold"}}
          >
            TheEyes
          </IconButton>
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button tabIndex={"-1"} sx={{'&:hover': {backgroundColor: "#c2c2c2"}}} color="inherit" onClick={navigateToHome}>
            Trang chủ
          </Button>
          <Button tabIndex={"-1"} sx={{'&:hover': {backgroundColor: "#c2c2c2"}}} color="inherit" onClick={navigateToNews}>
            Sách nói
          </Button>
          <Button tabIndex={"-1"} sx={{'&:hover': {backgroundColor: "#c2c2c2"}}} color="inherit">
            Nghe nhạc
          </Button>
          <Button tabIndex={"-1"} sx={{'&:hover': {backgroundColor: "#c2c2c2"}}} color="inherit" onClick={navigateToCall}>
            Xã hội
          </Button>
          <Button tabIndex={"-1"} sx={{'&:hover': {backgroundColor: "#c2c2c2"}}} color="inherit" onClick={navigateToProfile}>
            Tài khoản
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
