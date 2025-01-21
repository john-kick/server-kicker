import MinecraftImage from "@/images/Minecraft.png";
import SatisfactoryImage from "@/images/Satisfactory.png";
import WreckfestImage from "@/images/Wreckfest.png";
import { ServerConfigList } from "@/types/ServerConfiguration";
import { StaticImageData } from "next/image";
import minecraftServerConfigs from "./MinecraftServerConfiguration";
import satisfactoryServerConfigs from "./SatisfactoryServerConfiguration";
import wreckfestServerConfigs from "./WreckfestServerConfiguration";

// Define a unified GameData structure that includes both game details and parameters
export type GameData = {
  title: string;
  image: StaticImageData;
  parameters: { [section: string]: ServerConfigList };
};

// Define the games array with both game info and specific parameters
export const games: { [key: string]: GameData } = {
  minecraft: {
    title: "Minecraft",
    image: MinecraftImage,
    parameters: minecraftServerConfigs
  },
  satisfactory: {
    title: "Satisfactory",
    image: SatisfactoryImage,
    parameters: satisfactoryServerConfigs
  },
  wreckfest: {
    title: "Wreckfest",
    image: WreckfestImage,
    parameters: wreckfestServerConfigs
  }
};
