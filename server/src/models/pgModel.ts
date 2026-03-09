import { Client } from "pg";
import { generateToken } from "../services/auth";

const pgClient = new Client({
  user: "admin",
  database: "request-basket",
  port: 5432,
  host: "localhost",
  password: "",
  ssl: false,
});

function pgConnection() {
  return pgClient.connect();
}

export const pgModel = {
  async addNewBasket(endpoint: string) {
    const token = generateToken(endpoint);
    const command = 'INSERT INTO baskets (endpoint, token) VALUES ($1, $2)';
    const client = await pgClient.connect();

    try {
      const res = await client.query(command, [endpoint, token]);
    } catch (e) {
      console.error(e);
      throw new Error('Query failed to insert new basket.');
    }
  },
  
  async getBasketToken(endpoint: string) {
    const command = 'SELECT * FROM baskets WHERE endpoint = $1';
    const client = await pgClient.connect();

    try {
      const res = await client.query(command, [endpoint]);
      if (res.rows.length > 0) {
        return res.rows[0].token;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      throw new Error('Query failed to retrieve a token for given endpoint.');
    }
  },

  async basketExists(endpoint: string) {
    const client = await pgClient.connect();
    const command = 'SELECT * FROM baskets WHERE endpoint = $1';

    const res = await client.query(command, [endpoint]);
    return res.rows.length > 0;
  },
};
