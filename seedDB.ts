import mariadb from "mariadb";
import { faker } from "@faker-js/faker";
import { config } from "dotenv";

// Read data from .env
config();

const { DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

console.log(process.env);

if (!DB_PORT || !DB_USER || !DB_PASSWORD || !DB_DATABASE) {
  throw new Error("Invalid config");
}

// Create a connection pool
const pool = mariadb.createPool({
  host: "localhost", // Change as needed
  port: +DB_PORT,
  user: DB_USER, // Change as needed
  password: DB_PASSWORD, // Change as needed
  database: DB_DATABASE, // Change as needed
  connectionLimit: 5
});

// Generates random data for Minecraft servers
function generateMinecraftServer() {
  return [
    faker.internet.domainWord(), // name
    faker.lorem.sentence(), // description
    faker.number.int({ min: 10, max: 100 }), // max_players
    faker.datatype.boolean(), // allow_flight
    faker.datatype.boolean(), // allow_nether
    faker.helpers.arrayElement(["peaceful", "easy", "normal", "hard"]), // difficulty
    faker.helpers.arrayElement([
      "survival",
      "creative",
      "adventure",
      "spectator"
    ]), // gamemode
    faker.datatype.boolean(), // force_gamemode
    faker.datatype.boolean(), // generate_structures
    faker.string.alphanumeric(10), // level_seed
    faker.helpers.arrayElement([
      "default",
      "flat",
      "largeBiomes",
      "amplified",
      "buffet"
    ]), // level_type
    faker.number.int({ min: 1000, max: 29999984 }), // max_world_size
    faker.number.int({ min: 0, max: 16 }), // spawn_protection
    faker.number.int({ min: 0, max: 60 }), // player_idle_timeout
    faker.datatype.boolean(), // white_list
    faker.datatype.boolean(), // hide_online_players
    faker.datatype.boolean(), // pvp
    faker.datatype.boolean(), // spawn_animals
    faker.datatype.boolean(), // spawn_monsters
    faker.datatype.boolean(), // spawn_npcs
    faker.number.int({ min: 2, max: 32 }), // simulation_distance
    faker.number.int({ min: 2, max: 32 }), // view_distance
    faker.datatype.boolean(), // snooper_enabled
    faker.lorem.words(5), // motd
    faker.number.int({ min: 1, max: 4 }), // function_permission_level
    faker.datatype.boolean() // enable_command_block
  ];
}

// Generates random data for Satisfactory & Wreckfest servers
function generateGenericServer() {
  return [
    faker.internet.domainWord(), // name
    faker.lorem.sentence(), // description
    faker.number.int({ min: 0, max: 10 }), // playerCount
    faker.number.int({ min: 10, max: 20 }), // maxPlayerCount
    faker.datatype.boolean(), // active
    faker.date.past(), // startTime
    faker.word.noun(), // customParam1
    faker.word.noun() // customParam2
  ];
}

async function seedData() {
  let conn;
  try {
    conn = await pool.getConnection();

    // Insert mock Minecraft servers
    await conn.batch(
      `INSERT INTO minecraft_servers 
        (name, description, max_players, allow_flight, allow_nether, difficulty, gamemode, force_gamemode, generate_structures, level_seed, level_type, max_world_size, spawn_protection, player_idle_timeout, white_list, hide_online_players, pvp, spawn_animals, spawn_monsters, spawn_npcs, simulation_distance, view_distance, snooper_enabled, motd, function_permission_level, enable_command_block) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      Array.from({ length: 5 }, generateMinecraftServer) // Generate 5 Minecraft servers
    );

    // Insert mock Satisfactory servers
    await conn.batch(
      `INSERT INTO satisfactory_servers 
        (name, description, playerCount, maxPlayerCount, active, startTime, customParam1, customParam2) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      Array.from({ length: 3 }, generateGenericServer) // Generate 3 Satisfactory servers
    );

    // Insert mock Wreckfest servers
    await conn.batch(
      `INSERT INTO wreckfest_servers 
        (name, description, playerCount, maxPlayerCount, active, startTime, customParam1, customParam2) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      Array.from({ length: 3 }, generateGenericServer) // Generate 3 Wreckfest servers
    );

    console.log("Mock data inserted successfully!");
  } catch (error) {
    console.error("Error inserting mock data:", error);
  } finally {
    if (conn) conn.end();
  }
}

// Run the function
seedData();
