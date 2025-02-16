import { MinecraftServerConfigKey } from "../MinecraftServerConfiguration";

const minecraftServer: Record<
  string,
  Partial<Record<MinecraftServerConfigKey, any>>
> = {
  "123456789": {
    "allow-flight": true,
    difficulty: "hard",
    gamemode: "creative",
    "level-type": "amplified",
    "max-players": 50,
    "spawn-protection": 32,
    "simulation-distance": 16,
    motd: "Welcome to the Test Server!",
    "enable-command-block": true
  },
  test: {
    hardcore: true,
    difficulty: "hard",
    gamemode: "survival",
    "force-gamemode": true,
    "white-list": true,
    "max-world-size": 10000,
    pvp: false
  },
  bla: {
    "allow-flight": true,
    gamemode: "creative",
    "max-players": 100,
    "view-distance": 20,
    "generate-structures": false,
    "level-type": "flat",
    "enable-command-block": true
  },
  hellothere: {
    difficulty: "normal",
    "max-players": 10,
    "player-idle-timeout": 5,
    "spawn-animals": false,
    "spawn-monsters": false,
    "hide-online-players": true,
    "snooper-enabled": false
  }
};

export default minecraftServer;
