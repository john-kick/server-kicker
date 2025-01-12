"use client";

import GameCard from "@/app/components/GameCard";
import React from "react";
import minecraft from "../../../public/images/Satisfactory.png";
import { useRouter } from "next/navigation";

export default function Page(): React.JSX.Element {
  const router = useRouter();

  const toDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <GameCard img={minecraft} title="Satisfactory" onClick={toDashboard} />
  );
}
