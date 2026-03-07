import { Client } from "pg";

const pgClient = new Client({
  user: "admin",
  database: "request-basket",
  port: 5432,
  host: "localhost",
  password: "",
  ssl: false,
});

export const pgModel = {
  // how do we validate users without any keys?
  getExistingBaskets() {
    //
  },

  addNewBasket(endpoint: string) {
    // generate new basket
    //  id
    //  endpoint
    // add new basket to postgres
    //
  },

  basketExists(endpoint) {
    // logic
  },

  clearBasket(endpoint) {
    // logic
  },
};
