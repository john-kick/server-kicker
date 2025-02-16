import mariadb from "mariadb";

const { DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

export class MariaDBClient {
  private pool: mariadb.Pool;

  constructor() {
    if (!DB_PORT || !DB_DATABASE || !DB_USER || !DB_PASSWORD) {
      throw new Error("Invalid config");
    }

    this.pool = mariadb.createPool({
      host: "localhost",
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      port: +DB_PORT,
      connectionLimit: 5 // Limit connections for efficiency
    });
  }

  async getConnection(): Promise<mariadb.Connection> {
    try {
      return await this.pool.getConnection();
    } catch (error) {
      console.error("Error getting MariaDB connection:", error);
      throw error;
    }
  }

  async query(sql: string, params?: any[]): Promise<any> {
    let conn: mariadb.Connection | null = null;
    try {
      conn = await this.getConnection();
      return await conn.query(sql, params);
    } catch (error) {
      console.error("Query Error:", error);
      throw error;
    } finally {
      if (conn) conn.end();
    }
  }

  async closePool(): Promise<void> {
    try {
      await this.pool.end();
    } catch (error) {
      console.error("Error closing MariaDB pool:", error);
    }
  }
}
