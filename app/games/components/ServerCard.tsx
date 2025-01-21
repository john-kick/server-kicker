import ServerInfo from "@/types/ServerInfo";
import { useState, useEffect } from "react";

type ServerCardProps = {
  serverInfo: ServerInfo;
  onClick?: () => void;
};

export default function ServerCard({ serverInfo, onClick }: ServerCardProps) {
  const {
    name,
    id,
    description,
    playerCount,
    maxPlayerCount,
    active,
    startTime
  } = serverInfo;

  const [elapsedTime, setElapsedTime] = useState("");

  function calculateElapsedTime(timestamp: number): string {
    const now = Date.now();
    const elapsed = now - timestamp;

    if (elapsed < 0) {
      return "Invalid timestamp";
    }

    const totalSeconds = Math.floor(elapsed / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format as `x days hh:mm:ss`
    const formattedTime = [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0")
    ].join(":");

    return formattedTime;
  }

  useEffect(() => {
    if (active) {
      const updateElapsedTime = () => {
        setElapsedTime(calculateElapsedTime(startTime));
      };

      updateElapsedTime(); // Set the initial time
      const intervalId = setInterval(updateElapsedTime, 1000); // Update every second

      return () => clearInterval(intervalId); // Clean up interval on component unmount
    }
  }, [active, startTime]);

  const runningSection = (
    <div>
      <p className="active-players">
        Active players: {playerCount}/{maxPlayerCount}
      </p>
      <p>Uptime: {elapsedTime}</p>
    </div>
  );

  return (
    <div
      className={"server-card" + (active ? " active" : "")}
      onClick={onClick} // Call the handler when clicked
    >
      <div className="badge">{active ? "Online" : "Offline"}</div>
      <h3 className="title">{name}</h3>
      <p className="id">({id})</p>
      <p className="description">{description}</p>
      {active && runningSection}
    </div>
  );
}
