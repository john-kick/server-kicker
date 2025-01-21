import { ServerConfigList } from "@/types/ServerConfiguration";

const minecraftServerConfigs: {
  [section: string]: ServerConfigList;
} = {
  general: {
    identifier: "General",
    config: [
      { id: "max-players", title: "Max Players", type: "number" },
      { id: "motd", title: "Message of the Day", type: "string" },
      { id: "level-name", title: "World Name", type: "string" },
      { id: "level-seed", title: "World Seed", type: "string" },
      { id: "allow-nether", title: "Allow Nether", type: "boolean" },
      { id: "allow-flight", title: "Allow Flight", type: "boolean" },
      {
        id: "enable-command-block",
        title: "Enable Command Blocks",
        type: "boolean"
      }
    ]
  },

  gameModeDifficulty: {
    identifier: "Gamemode Difficulty",
    config: [
      {
        id: "gamemode",
        title: "Game Mode",
        type: "enum",
        options: ["survival", "creative", "adventure", "spectator"]
      },
      {
        id: "difficulty",
        title: "Difficulty",
        type: "enum",
        options: ["peaceful", "easy", "normal", "hard"]
      },
      { id: "spawn-monsters", title: "Spawn Monsters", type: "boolean" },
      { id: "spawn-animals", title: "Spawn Animals", type: "boolean" },
      { id: "spawn-npcs", title: "Spawn NPCs", type: "boolean" },
      { id: "hardcore", title: "Hardcore Mode", type: "boolean" },
      { id: "pvp", title: "Enable PVP", type: "boolean" }
    ]
  },

  worldSettings: {
    identifier: "World Settings",
    config: [
      {
        id: "generator-settings",
        title: "World Generator Settings",
        type: "json"
      },
      { id: "world-border", title: "World Border", type: "string" },
      {
        id: "world-type",
        title: "World Type",
        type: "enum",
        options: ["default", "flat", "largebiomes", "amplified"]
      },
      { id: "structures", title: "Enable Structures", type: "boolean" }
    ]
  },

  playerPermissions: {
    identifier: "Player Permissions",
    config: [
      { id: "max-tick-time", title: "Max Tick Time", type: "number" },
      { id: "view-distance", title: "View Distance", type: "number" },
      { id: "max-world-size", title: "Max World Size", type: "number" }
    ]
  },

  performance: {
    identifier: "Performance",
    config: [
      { id: "tick-distance", title: "Tick Distance", type: "number" },
      { id: "spawn-protection", title: "Spawn Protection", type: "number" },
      {
        id: "player-idle-timeout",
        title: "Player Idle Timeout",
        type: "number"
      },
      { id: "enable-chat", title: "Enable Chat", type: "boolean" }
    ]
  },

  mobsAI: {
    identifier: "Mobs AI",
    config: [
      { id: "mob-spawn-range", title: "Mob Spawn Range", type: "number" },
      {
        id: "max-entity-collisions",
        title: "Max Entity Collisions",
        type: "number"
      },
      { id: "spawn-radius", title: "Spawn Radius", type: "number" }
    ]
  },

  gameRules: {
    identifier: "Gamerules",
    config: [
      {
        id: "do-daylight-cycle",
        title: "Enable Daylight Cycle",
        type: "boolean"
      },
      { id: "do-mob-spawning", title: "Enable Mob Spawning", type: "boolean" },
      {
        id: "do-weather-cycle",
        title: "Enable Weather Cycle",
        type: "boolean"
      },
      {
        id: "keep-inventory",
        title: "Keep Inventory on Death",
        type: "boolean"
      },
      {
        id: "announce-achievements",
        title: "Announce Achievements",
        type: "boolean"
      }
    ]
  },

  whitelistBans: {
    identifier: "Whitelist, Banned players and OPs",
    config: [
      { id: "whitelist", title: "Enable Whitelist", type: "boolean" },
      { id: "white-list", title: "Whitelist Players", type: "string" },
      { id: "banned-players", title: "Banned Players", type: "string" },
      { id: "banned-ips", title: "Banned IPs", type: "string" },
      { id: "ops", title: "Operator Players", type: "string" }
    ]
  },

  backupsSecurity: {
    identifier: "Backups and Security",
    config: [
      { id: "auto-save-interval", title: "Auto Save Interval", type: "number" },
      {
        id: "prevent-proxy-connections",
        title: "Prevent Proxy Connections",
        type: "boolean"
      },
      {
        id: "enable-plugin-metrics",
        title: "Enable Plugin Metrics",
        type: "boolean"
      }
    ]
  },

  loggingDebugging: {
    identifier: "Logging and Debugging",
    config: [
      { id: "log-fabric", title: "Enable Fabric Logging", type: "boolean" },
      { id: "debug", title: "Enable Debug Mode", type: "boolean" },
      { id: "log-commands", title: "Log Commands", type: "boolean" }
    ]
  },

  commandSettings: {
    identifier: "Command Blocks",
    config: [
      {
        id: "enable-command-block",
        title: "Enable Command Blocks",
        type: "boolean"
      },
      {
        id: "command-block-output",
        title: "Command Block Output",
        type: "boolean"
      }
    ]
  }
};

export default minecraftServerConfigs;
