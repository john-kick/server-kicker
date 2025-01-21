-- Create a table for each game (replace 'game1' with actual game names)

-- Example: Table for 'Game1'
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

-- Example: Table for 'Game2'
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

-- Additional tables for other games would be added similarly
