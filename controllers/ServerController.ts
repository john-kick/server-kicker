import { MariaDBClient } from "@/util/MariaDBConnector";

export class ServerController {
  private db: MariaDBClient;

  constructor() {
    this.db = new MariaDBClient();
  }

  // Helper function to determine the correct table name based on the server type
  private getServerTableName(game: string): string {
    switch (game) {
      case "minecraft":
        return "minecraft_servers";
      case "satisfactory":
        return "satisfactory_servers";
      case "wreckfest":
        return "wreckfest_servers";
      default:
        throw new Error(`Unsupported game: ${game}`);
    }
  }

  async createServer(
    game: string,
    data: Partial<Record<string, any>>
  ): Promise<number> {
    try {
      if (!data.name) {
        throw new Error("The 'name' field is required.");
      }

      const tableName = this.getServerTableName(game);

      const keys = Object.keys(data);
      const values = Object.values(data);

      const placeholders = keys.map(() => "?").join(", ");
      const columns = keys.join(", ");

      const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

      const result = await this.db.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error creating server:", error);
      throw error;
    }
  }

  async getServerById(game: string, id: number): Promise<any> {
    try {
      const tableName = this.getServerTableName(game);
      const result = await this.db.query(
        `SELECT * FROM ${tableName} WHERE id = ?`,
        [id]
      );
      return result.length ? result[0] : null;
    } catch (error) {
      console.error("Error fetching server:", error);
      throw error;
    }
  }

  async getAllServers(game: string): Promise<any[]> {
    try {
      const tableName = this.getServerTableName(game);
      return await this.db.query(`SELECT * FROM ${tableName}`);
    } catch (error) {
      console.error("Error fetching all servers:", error);
      throw error;
    }
  }

  async updateServer(
    game: string,
    id: number,
    data: Partial<Record<string, any>>
  ): Promise<boolean> {
    try {
      if (Object.keys(data).length === 0) {
        throw new Error("No fields provided for update.");
      }

      const tableName = this.getServerTableName(game);

      const fields = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = Object.values(data);
      values.push(id);

      await this.db.query(
        `UPDATE ${tableName} SET ${fields} WHERE id = ?`,
        values
      );
      return true;
    } catch (error) {
      console.error("Error updating server:", error);
      throw error;
    }
  }

  async deleteServer(game: string, id: number): Promise<boolean> {
    try {
      const tableName = this.getServerTableName(game);
      await this.db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
      return true;
    } catch (error) {
      console.error("Error deleting server:", error);
      throw error;
    }
  }
}
