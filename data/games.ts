import { StaticImageData } from "next/image";
import MinecraftImage from "@/images/Minecraft.png";
import SatisfactoryImage from "@/images/Satisfactory.png";

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
  }
];
