import mariadb from "mariadb";

const { DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

if (!DB_PORT || !DB_DATABASE || !DB_USER || !DB_PASSWORD) {
  throw new Error("Invalid database configuration.");
}

const pool = mariadb.createPool({
  host: "localhost",
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: +DB_PORT,
  connectionLimit: 5
});

export class MariaDBClient {
  async getConnection(): Promise<mariadb.Connection> {
    try {
      return await pool.getConnection();
    } catch (error) {
      console.error("Error getting MariaDB connection:", error);
      throw error;
    }
  }

  async query<T>(sql: string, params?: any[]): Promise<T> {
    let conn: mariadb.Connection | null = null;
    try {
      conn = await this.getConnection();
      return await conn.query(sql, params);
    } catch (error) {
      console.error("Query Error:", error);
      throw error;
    } finally {
      if (conn) await conn.end();
    }
  }

  static async closePool(): Promise<void> {
    try {
      await pool.end();
    } catch (error) {
      console.error("Error closing MariaDB pool:", error);
    }
  }
}
