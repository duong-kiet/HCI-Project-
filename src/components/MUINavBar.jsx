import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import React from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../public/favicon.jpg"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
  
  function navigateToMusic(e) {
    e.preventDefault();
    navigate("/music");
  }

  function navigateToBooks(e) {
    e.preventDefault();
    navigate("/books");
  }

  function navigateToVoiceChat(e) {
    e.preventDefault();
    navigate("/voice-chat");
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#ffffff" }}>
      <Toolbar sx={{ color: "#a75c00" }}>
        <IconButton
          tabIndex={"-1"}
          size="large"
          edge="start"
          color="bg-blue-900"
          aria-label="logo"
          className="w-30"
          sx={{ paddingRight: 0 }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "40px", height: "40px" }}
          />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <IconButton
            tabIndex={"-1"}
            color="inherit"
            onClick={navigateToHome}
            className="h-10"
            sx={{ fontSize: 35, fontWeight: "bold" }}
          >
            TheEyes
          </IconButton>
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            tabIndex={"-1"}
            sx={{ '&:hover': { backgroundColor: "#c2c2c2" } }}
            color="inherit"
            onClick={navigateToHome}
          >
            Trang chủ
          </Button>
          <Button tabIndex={"-1"} sx={{ '&:hover': { backgroundColor: "#c2c2c2" } }} color="inherit" onClick={navigateToNews}>
            Tin tức 
          </Button>
          <Button tabIndex={"-1"} sx={{ '&:hover': { backgroundColor: "#c2c2c2" } }} color="inherit" onClick={navigateToMusic}>
            Nghe nhạc
          </Button>
          <Button tabIndex={"-1"} sx={{ '&:hover': { backgroundColor: "#c2c2c2" } }} color="inherit" onClick={navigateToBooks}>
            Đọc sách
          </Button>
          <Button tabIndex={"-1"} sx={{ '&:hover': { backgroundColor: "#c2c2c2" } }} color="inherit" onClick={navigateToVoiceChat}>
            Trò chuyện
          </Button>
          <IconButton
            tabIndex="-1"
            sx={{
              '&:hover': { backgroundColor: '#c2c2c2' },
            }}
            color="inherit"
            onClick={navigateToProfile}
          >
            <AccountCircleIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};