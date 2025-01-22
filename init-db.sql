-- Table for Minecraft server
CREATE TABLE IF NOT EXISTS `minecraft_servers` (
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
