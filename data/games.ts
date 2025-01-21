import { StaticImageData } from "next/image";
import MinecraftImage from "@/images/Minecraft.png";
import SatisfactoryImage from "@/images/Satisfactory.png";
import WreckfestImage from "@/images/Wreckfest.png";

// Define a unified GameData structure that includes both game details and parameters
export type GameData = {
  name: string;
  title: string;
  image: StaticImageData;
  parameters: Array<{
    key: string;
    name: string;
    type: "text" | "number" | "select" | "checkbox";
    defaultValue?: any;
    options?: string[];
    placeholder?: string;
  }>;
};

// Define the games array with both game info and specific parameters
export const games: GameData[] = [
  {
    name: "minecraft",
    title: "Minecraft",
    image: MinecraftImage,
    parameters: [
      {
        key: "worldSize",
        name: "World Size",
        type: "select",
        options: ["Small", "Medium", "Large"]
      },
      {
        key: "gameMode",
        name: "Game Mode",
        type: "select",
        options: ["Survival", "Creative", "Adventure"]
      },
      {
        key: "difficulty",
        name: "Difficulty",
        type: "select",
        options: ["Peaceful", "Easy", "Normal", "Hard"]
      },
      {
        key: "maxPlayers",
        name: "Max Players",
        type: "number",
        defaultValue: 10,
        placeholder: "Enter max players"
      }
    ]
  },
  {
    name: "satisfactory",
    title: "Satisfactory",
    image: SatisfactoryImage,
    parameters: [
      {
        key: "mapSize",
        name: "Map Size",
        type: "select",
        options: ["Small", "Medium", "Large"]
      },
      {
        key: "difficulty",
        name: "Difficulty",
        type: "select",
        options: ["Normal", "Hard"]
      },
      {
        key: "maxPlayers",
        name: "Max Players",
        type: "number",
        defaultValue: 4,
        placeholder: "Enter max players"
      }
    ]
  },
  {
    name: "wreckfest",
    title: "Wreckfest",
    image: WreckfestImage,
    parameters: [
      {
        key: "trackType",
        name: "Track Type",
        type: "select",
        options: ["Oval", "Circuit", "Demolition Derby"]
      },
      {
        key: "vehicleClass",
        name: "Vehicle Class",
        type: "select",
        options: ["Class A", "Class B", "Class C"]
      },
      {
        key: "difficulty",
        name: "Difficulty",
        type: "select",
        options: ["Easy", "Normal", "Hard"]
      },
      {
        key: "maxPlayers",
        name: "Max Players",
        type: "number",
        defaultValue: 8,
        placeholder: "Enter max players"
      }
    ]
  }
];
