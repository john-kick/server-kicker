-- Table for Minecraft server
CREATE TABLE IF NOT EXISTS `minecraft_servers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `max_players` INT DEFAULT 20,
    `allow_flight` BOOLEAN DEFAULT FALSE,
    `allow_nether` BOOLEAN DEFAULT TRUE,
    `difficulty` ENUM('peaceful', 'easy', 'normal', 'hard') DEFAULT 'easy',
    `gamemode` ENUM('survival', 'creative', 'adventure', 'spectator') DEFAULT 'survival',
    `force_gamemode` BOOLEAN DEFAULT FALSE,
    `generate_structures` BOOLEAN DEFAULT TRUE,
    `generator_settings` LONGTEXT,  -- Removed DEFAULT '{}'
    `hardcore` BOOLEAN DEFAULT FALSE,
    `level_seed` VARCHAR(255) DEFAULT '',
    `level_type` ENUM('default', 'flat', 'largeBiomes', 'amplified', 'buffet') DEFAULT 'default',
    `max_world_size` INT DEFAULT 29999984,
    `spawn_protection` INT DEFAULT 16,
    `player_idle_timeout` INT DEFAULT 0,
    `white_list` BOOLEAN DEFAULT FALSE,  -- Removed duplicate
    `hide_online_players` BOOLEAN DEFAULT FALSE,
    `pvp` BOOLEAN DEFAULT TRUE,
    `spawn_animals` BOOLEAN DEFAULT TRUE,
    `spawn_monsters` BOOLEAN DEFAULT TRUE,
    `spawn_npcs` BOOLEAN DEFAULT TRUE,
    `simulation_distance` INT DEFAULT 10,
    `view_distance` INT DEFAULT 10,
    `snooper_enabled` BOOLEAN DEFAULT FALSE,
    `motd` VARCHAR(255) DEFAULT 'A Minecraft Server by Server Kicker',
    `function_permission_level` INT DEFAULT 2,
    `enable_command_block` BOOLEAN DEFAULT FALSE
);

-- Table for Satisfactory server
CREATE TABLE IF NOT EXISTS `satisfactory_servers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `playerCount` INT DEFAULT 0,
    `maxPlayerCount` INT DEFAULT 0,
    `active` BOOLEAN DEFAULT FALSE,
    `startTime` TIMESTAMP,
    `customParam1` VARCHAR(255),
    `customParam2` VARCHAR(255)
);

-- Table for Wreckfest server
CREATE TABLE IF NOT EXISTS `wreckfest_servers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `playerCount` INT DEFAULT 0,
    `maxPlayerCount` INT DEFAULT 0,
    `active` BOOLEAN DEFAULT FALSE,
    `startTime` TIMESTAMP,
    `customParam1` VARCHAR(255),
    `customParam2` VARCHAR(255)
);
