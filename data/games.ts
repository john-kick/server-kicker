import MinecraftImage from "@/images/Minecraft.png";
import SatisfactoryImage from "@/images/Satisfactory.png";
import WreckfestImage from "@/images/Wreckfest.png";
import { ServerConfigList } from "@/types/ServerConfiguration";
import { StaticImageData } from "next/image";
import minecraftServerConfigs, {
  MinecraftServerConfigKey
} from "./MinecraftServerConfiguration";
import satisfactoryServerConfigs, {
  SatisfactoryServerConfigKey
} from "./SatisfactoryServerConfiguration";
import wreckfestServerConfigs, {
  WreckfestServerConfigKey
} from "./WreckfestServerConfiguration";

// Define a unified GameData structure that includes both game details and parameters
export type GameData<T> = {
  title: string;
  image: StaticImageData;
  parameters: ServerConfigList<T>[];
};

// Define the games array with both game info and specific parameters
export const games: {
  [key: string]: GameData<
    | MinecraftServerConfigKey
    | SatisfactoryServerConfigKey
    | WreckfestServerConfigKey
  >;
} = {
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
