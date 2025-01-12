"use client";

import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import logo from "../../public/images/logo192.png";
import Link from "next/link";
import { useState } from "react";

export default function NavBar(): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname(); // Get the current URL path
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State to handle dropdown

  const games = ["minecraft"];

  const handleLogout = () => {
    // Remove token from cookies
    Cookies.remove("token");
    // Redirect to the login page
    router.push("/login");
  };

  // Handle dropdown open
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle dropdown close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ zIndex: 1201 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/dashboard">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none"
              }}
            >
              <Image
                src={logo}
                alt="Server Kicker Logo"
                width={40}
                height={40}
                style={{ marginRight: "10px" }}
              />
              <Typography variant="h6" sx={{ color: "white" }}>
                Server Kicker
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Button Group for Dashboard and Showcase */}
        <ButtonGroup
          variant="outlined"
          aria-label="navigation buttons"
          sx={{ display: "flex", gap: 0 }}
        >
          <Button
            variant={pathname === "/dashboard" ? "contained" : "outlined"}
          >
            <Link href="/dashboard" passHref>
              Dashboard
            </Link>
          </Button>
          <Button variant={pathname === "/showcase" ? "contained" : "outlined"}>
            <Link href="/showcase" passHref>
              Showcase
            </Link>
          </Button>
        </ButtonGroup>

        {/* "Games" Dropdown */}
        <Box sx={{ position: "relative" }}>
          <IconButton
            color="inherit"
            onClick={handleMenuClick}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="button" sx={{ color: "white" }}>
              Games
            </Typography>
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {games.map((game, index) => (
              <MenuItem key={`game-${index}`} onClick={handleMenuClose}>
                <Link href={`/games/${game}`}>{game.toLocaleUpperCase()}</Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Logout Button */}
        <IconButton color="inherit" onClick={handleLogout}>
          <Typography variant="button" sx={{ color: "white" }}>
            Logout
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
