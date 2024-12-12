import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  InputBase,
  alpha,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";
import Logo from "../../public/favicon.jpg";
import { Link, useNavigate } from "react-router-dom";

export const NavBarNews = () => {
  const navigate = useNavigate();

  function navigateToHome(e) {
    e.preventDefault();
    navigate("/home-page");
  }

  function navigateToRadio(e) {
    e.preventDefault();
    navigate("/Radio");
  }

  function navigateToBooks(e) {
    e.preventDefault();
    navigate("/Books");
  }

  function navigateToSports(e) {
    e.preventDefault();
    navigate("/Sports");
  }

  function navigateToEducation(e) {
    e.preventDefault();
    navigate("/Education");
  }

  function navigateToNews(e) {
    e.preventDefault();
    navigate("/news");
  }

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#fffffff" }}
    >
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
        {/* Search bar */}
        <InputBase
          tabIndex={"-1"}
          placeholder="Search..."
          sx={{
            color: "inherit",
            ml: 1,
            flex: 1,
            borderRadius: 4,
            backgroundColor: alpha("#a75c00", 0.15),
            "&:hover": {
              backgroundColor: alpha("#a75c00", 0.25),
            },
            p: "8px 12px",
            marginRight: 2
          }}
        />
        {/* End of search bar */}
        <Stack direction="row" spacing={2}>
        <Button
            tabIndex={"-1"}
            sx={{ '&:hover': { backgroundColor: "#c2c2c2" } }}
            color="inherit"
            onClick={navigateToHome}
          >
            Trang chủ
          </Button>
          <Button
            tabIndex={"-1"}
            sx={{ '&:hover': { backgroundColor: "#c2c2c2" } }}
            color="inherit"
            onClick={navigateToNews}
          >
            Tin tức
          </Button>
          <Button
            tabIndex={"-1"}
            sx={{ '&:hover': { backgroundColor: "#c2c2c2" } }}
            color="inherit"
            onClick={navigateToRadio}
          >
            Âm nhạc	      
          </Button>	 
          <Button
            tabIndex={"-1"}
            sx={{ '&:hover': { backgroundColor: "#c2c2c2" } }}
            color="inherit"
            onClick={navigateToRadio}
          >
            Xã hội
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
