import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import uwinLogo from "./uwindsor_logo.png";

const navLinks = [
  { label: "DashBoard", to: "/" },
  { label: "My bookings", to: "/my-bookings" },
  {label :"Events", to: "/Events"},
  { label: "Support", to: "/Support" },
  { label: "My Attendance", to: "/MyAttendance" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // function handleLogout() {
  //   // Make an API call to logout the user
  //   fetch("/api/logout", {
  //     method: "POST",
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         // Clear user session and redirect to login page
  //         sessionStorage.clear();
  //         window.location.href = "/login";
  //       } else {
  //         throw new Error("Logout failed.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  function handleLogout() {
    // Clear user session and redirect to login page
    localStorage.clear();
    window.location.href = "/login";
  }
  

  const img = {
    maxWidth: "100%",
    height: "auto",
    width: "auto",
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <div style={img}>
              <img
                src={uwinLogo}
                alt="Logo"
                style={{ height: "40px", marginRight: "16px" }}
              />
            </div>{" "}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {navLinks.map((link) => (
                <MenuItem key={link.label}>
                  <Link
                    to={link.to}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {link.label}
                  </Link>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={Link}
                to={link.to}
                color="inherit"
              >
                {link.label}
              </Button>
            ))}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

