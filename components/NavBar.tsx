"use client";

import { games } from "@/data/games";
import { useAlert } from "@/hooks/useAlert";
import logo from "@/images/logo192.png";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar(): React.JSX.Element {
  const [gameSelectionOpen, setGameSelectionOpen] = useState(false);
  const { showAlert } = useAlert();

  const pages = [
    {
      title: "Dashboard",
      path: "/dashboard"
    },
    {
      title: "Showcase",
      path: "/showcase"
    }
  ];

  const handleToggleGameMenu = () => {
    setGameSelectionOpen((open) => !open);
  };

  const handleChooseGame = (game: string) => {
    setGameSelectionOpen(false);
    redirect(`/games/${game}`);
  };

  const router = useRouter();

  const handlePageButtonClick = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    showAlert("success", "Logged out.", true, 5);
    router.push("/logout");
  };

  return (
    <nav id="navbar">
      <Link id="logo-link" href="/dashboard">
        <Image src={logo} alt="Logo" width={40} height={40} />
        <h6>Server Kicker</h6>
      </Link>

      <div id="pages-wrapper">
        <div>
          {pages.map(({ title, path }) => (
            <button
              className="text-primary"
              key={title}
              onClick={() => handlePageButtonClick(path)}
            >
              {title}
            </button>
          ))}
        </div>
        <div className={"dropdown" + (gameSelectionOpen ? " open" : " closed")}>
          <button className="text-primary" onClick={handleToggleGameMenu}>
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#fff"
                d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              />
            </svg>
            Games
          </button>
          <menu>
            {games.map(({ name, title }) => (
              <li key={name} onClick={() => handleChooseGame(name)}>
                <p>{title}</p>
              </li>
            ))}
          </menu>
        </div>
      </div>

      <button className="text-primary" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
