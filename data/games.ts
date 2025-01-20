import { StaticImageData } from "next/image";
import MinecraftImage from "@/images/Minecraft.png";
import SatisfactoryImage from "@/images/Satisfactory.png";
import WreckfestImage from "@/images/Wreckfest.png";

export type GameData = {
  name: string;
  title: string;
  image: StaticImageData;
};

export const games: GameData[] = [
  { name: "minecraft", title: "Minecraft", image: MinecraftImage },
  {
    name: "satisfactory",
    title: "Satisfactory",
    image: SatisfactoryImage
  },
  {
    name: "wreckfest",
    title: "Wreckfest",
    image: WreckfestImage
  }
];
