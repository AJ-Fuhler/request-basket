import { generateToken } from "../services/auth";
import { pool } from "./dbConnection"

export const pgModel = {
  async addNewBasket(endpoint: string) {
    const token = generateToken(endpoint);
    const command = 'INSERT INTO baskets (endpoint, token) VALUES ($1, $2)';

    try {
      const res = await pool.query(command, [endpoint, token]);
    } catch (e) {
      console.error(e);
      throw new Error('Query failed to insert new basket.');
    }
  },
  
  async getBasketToken(endpoint: string) {
    const command = 'SELECT * FROM baskets WHERE endpoint = $1';

    try {
      const res = await pool.query(command, [endpoint]);
      if (res.rows.length > 0) {
        return res.rows[0].token;
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
      throw new Error('Query failed to retrieve a token for given endpoint.');
    }
  },

  async basketExists(endpoint: string) {
    const command = 'SELECT * FROM baskets WHERE endpoint = $1';
    
    try {
      const res = await pool.query(command, [endpoint]);
      return res.rows.length > 0;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to determine if basket exists");
    }
  },
};
