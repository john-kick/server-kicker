import { MariaDBClient } from "@/util/MariaDBConnector";

export class ServerController {
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
    if (!data.name) {
      throw new Error("The 'name' field is required.");
    }

    const tableName = this.getServerTableName(game);
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => "?").join(", ");
    const columns = keys.join(", ");
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

    const db = new MariaDBClient();
    try {
      const result = await db.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error creating server:", error);
      throw error;
    }
  }

  async getServerById(game: string, id: number): Promise<any> {
    const tableName = this.getServerTableName(game);
    const query = `SELECT * FROM ${tableName} WHERE id = ?`;

    const db = new MariaDBClient();
    try {
      const result = await db.query(query, [id]);
      return result.length ? result[0] : null;
    } catch (error) {
      console.error("Error fetching server:", error);
      throw error;
    }
  }

  async getAllServers(game: string): Promise<any[]> {
    const tableName = this.getServerTableName(game);
    const query = `SELECT * FROM ${tableName}`;

    const db = new MariaDBClient();
    try {
      return await db.query(query);
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
    if (Object.keys(data).length === 0) {
      throw new Error("No fields provided for update.");
    }

    const tableName = this.getServerTableName(game);
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(data);
    values.push(id);
    const query = `UPDATE ${tableName} SET ${fields} WHERE id = ?`;

    const db = new MariaDBClient();
    try {
      await db.query(query, values);
      return true;
    } catch (error) {
      console.error("Error updating server:", error);
      throw error;
    }
  }

  async deleteServer(game: string, id: number): Promise<boolean> {
    const tableName = this.getServerTableName(game);
    const query = `DELETE FROM ${tableName} WHERE id = ?`;

    const db = new MariaDBClient();
    try {
      await db.query(query, [id]);
      return true;
    } catch (error) {
      console.error("Error deleting server:", error);
      throw error;
    }
  }
}
