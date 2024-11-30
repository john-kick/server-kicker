import configDotenv from "dotenv";

configDotenv.config();

/**
 * The definition of the keys which need to be contained in the .env file.
 */
interface Config {
  APP_PORT: number;
  LOG_LEVEL: string;
  AUTH_SERVER_URL: string;
}

/**
 * Returns the associated value of the given key.
 */
const getConfigValue = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
};

/**
 * Create the config object. Converts strings to integers if applicable.
 */
const config: Config = {
  APP_PORT: +getConfigValue("APP_PORT"),
  LOG_LEVEL: getConfigValue("LOG_LEVEL"),
  AUTH_SERVER_URL: getConfigValue("AUTH_SERVER_URL")
};

export default config;
