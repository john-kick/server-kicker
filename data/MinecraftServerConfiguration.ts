import { ServerConfigList } from "@/types/ServerConfiguration";

export type MinecraftServerConfigKey =
  | "allow-flight"
  | "allow-nether"
  | "difficulty"
  | "enable-command-block"
  | "enforce-whitelist"
  | "force-gamemode"
  | "function-permission-level"
  | "gamemode"
  | "generate-structures"
  | "generator-settings"
  | "hardcore"
  | "hide-online-players"
  | "level-seed"
  | "level-type"
  | "max-players"
  | "max-world-size"
  | "motd"
  | "player-idle-timeout"
  | "pvp"
  | "simulation-distance"
  | "snooper-enabled"
  | "spawn-animals"
  | "spawn-monsters"
  | "spawn-npcs"
  | "spawn-protection"
  | "view-distance"
  | "white-list";

const minecraftServerConfigs: ServerConfigList<MinecraftServerConfigKey>[] = [
  {
    identifier: "General Settings",
    config: [
      {
        id: "allow-flight",
        title: "Allow Flight",
        type: "boolean",
        standard: false,
        tooltip:
          "Enables flying in survival mode for players with the appropriate permissions."
      },
      {
        id: "allow-nether",
        title: "Allow Nether",
        type: "boolean",
        standard: true,
        tooltip: "Allows players to enter the Nether dimension."
      },
      {
        id: "difficulty",
        title: "Difficulty",
        type: "enum",
        standard: "easy",
        options: ["peaceful", "easy", "normal", "hard"],
        tooltip: "Sets the difficulty level of the server."
      },
      {
        id: "gamemode",
        title: "Gamemode",
        type: "enum",
        standard: "survival",
        options: ["survival", "creative", "adventure", "spectator"],
        tooltip:
          "Sets the default game mode for new players joining the server."
      },
      {
        id: "force-gamemode",
        title: "Force Gamemode",
        type: "boolean",
        standard: false,
        tooltip:
          "Forces players to the server's default game mode when they join."
      },
      {
        id: "enforce-whitelist",
        title: "Enforce Whitelist",
        type: "boolean",
        standard: false,
        tooltip: "Requires players to be on the whitelist to join the server."
      }
    ]
  },
  {
    identifier: "World Settings",
    config: [
      {
        id: "generate-structures",
        title: "Generate Structures",
        type: "boolean",
        standard: true,
        tooltip:
          "Controls whether structures like villages and temples generate in the world."
      },
      {
        id: "generator-settings",
        title: "Generator Settings",
        type: "json",
        standard: "{}",
        tooltip:
          "Defines custom generator settings for the world, such as biome and terrain parameters."
      },
      {
        id: "hardcore",
        title: "Hardcore Mode",
        type: "boolean",
        standard: false,
        tooltip:
          "Enables hardcore mode, where players are permanently banned after dying."
      },
      {
        id: "level-seed",
        title: "Level Seed",
        type: "string",
        standard: "",
        tooltip: "Specifies the seed used to generate the world."
      },
      {
        id: "level-type",
        title: "Level Type",
        type: "enum",
        standard: "default",
        options: ["default", "flat", "largeBiomes", "amplified", "buffet"],
        tooltip: "Determines the type of world generated."
      },
      {
        id: "max-world-size",
        title: "Max World Size",
        type: "number",
        standard: 29999984,
        tooltip: "Defines the maximum size of the world border in blocks."
      },
      {
        id: "spawn-protection",
        title: "Spawn Protection",
        type: "number",
        standard: 16,
        tooltip:
          "Sets the radius around the world spawn point where non-operators cannot place or break blocks."
      }
    ]
  },
  {
    identifier: "Player Settings",
    config: [
      {
        id: "max-players",
        title: "Max Players",
        type: "number",
        standard: 20,
        tooltip:
          "Specifies the maximum number of players that can join the server."
      },
      {
        id: "player-idle-timeout",
        title: "Player Idle Timeout",
        type: "number",
        standard: 0,
        tooltip:
          "Kicks players who have been idle for the specified number of minutes. Set to 0 to disable."
      },
      {
        id: "white-list",
        title: "Whitelist Enabled",
        type: "boolean",
        standard: false,
        tooltip:
          "Enables the whitelist feature, requiring players to be added to the whitelist to join."
      },
      {
        id: "hide-online-players",
        title: "Hide Online Players",
        type: "boolean",
        standard: false,
        tooltip: "Hides the player list from appearing in the server's UI."
      },
      {
        id: "pvp",
        title: "Enable PVP",
        type: "boolean",
        standard: true,
        tooltip: "Determines whether players can harm each other on the server."
      }
    ]
  },
  {
    identifier: "Entity Settings",
    config: [
      {
        id: "spawn-animals",
        title: "Spawn Animals",
        type: "boolean",
        standard: true,
        tooltip:
          "Allows passive mobs like cows and pigs to spawn naturally in the world."
      },
      {
        id: "spawn-monsters",
        title: "Spawn Monsters",
        type: "boolean",
        standard: true,
        tooltip:
          "Allows hostile mobs like zombies and creepers to spawn naturally in the world."
      },
      {
        id: "spawn-npcs",
        title: "Spawn NPCs",
        type: "boolean",
        standard: true,
        tooltip: "Allows NPCs like villagers to spawn naturally in the world."
      }
    ]
  },
  {
    identifier: "Performance Settings",
    config: [
      {
        id: "simulation-distance",
        title: "Simulation Distance",
        type: "number",
        standard: 10,
        tooltip:
          "Sets the number of chunks around players that are actively simulated."
      },
      {
        id: "view-distance",
        title: "View Distance",
        type: "number",
        standard: 10,
        tooltip: "Determines how many chunks players can see in the game world."
      },
      {
        id: "snooper-enabled",
        title: "Snooper Enabled",
        type: "boolean",
        standard: false,
        tooltip:
          "Controls whether the server sends anonymized usage data to Mojang."
      }
    ]
  },
  {
    identifier: "Advanced Settings",
    config: [
      {
        id: "motd",
        title: "Message of the Day",
        type: "string",
        standard: "A Minecraft Server",
        tooltip: "Sets the message displayed in the server list."
      },
      {
        id: "function-permission-level",
        title: "Function Permission Level",
        type: "number",
        standard: 2,
        tooltip:
          "Defines the permission level required to execute functions via command blocks."
      },
      {
        id: "enable-command-block",
        title: "Enable Command Block",
        type: "boolean",
        standard: false,
        tooltip: "Allows command blocks to be used on the server."
      }
    ]
  }
];

export default minecraftServerConfigs;
