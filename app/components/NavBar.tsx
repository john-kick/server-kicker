"use client";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import logo from "@/app/images/logo192.png";

export default function NavBar(): React.JSX.Element {
  const [anchorElGames, setAnchorElGames] = useState<null | HTMLElement>(null);

  const pages = ["dashboard", "showcase"];
  const games = ["minecraft", "satisfactory"];

  const handleOpenGameMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElGames(event.currentTarget);
  };

  const handleCloseGameMenu = () => {
    setAnchorElGames(null);
  };

  const handleChooseGame = (game: string) => {
    setAnchorElGames(null);
    redirect(`/games/${game}`);
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
        <Box className="flex align-middle me-3">
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

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ my: 2, color: "white", display: "block" }}
              href={`/${page}`}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={handleOpenGameMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Games
          </Button>
          <Menu
            open={Boolean(anchorElGames)}
            anchorEl={anchorElGames}
            onClose={handleCloseGameMenu}
          >
            {games.map((game) => (
              <MenuItem key={game} onClick={() => handleChooseGame(game)}>
                <Typography className="text-center">
                  {game.toUpperCase()}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Logout Button */}
        <IconButton color="inherit" href="/logout">
          <Typography variant="button" sx={{ color: "white" }}>
            Logout
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
