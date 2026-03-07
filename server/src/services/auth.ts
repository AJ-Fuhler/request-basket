import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // When invoked, reads `.env` file and assigns to `process.env`
const secret = process.env.SECRET_KEY!;

// A single JWT token for each endpoint
export function generateToken(endpoint) {
  const payload = {
    url: endpoint,
  };

  return jwt.sign(payload, secret);
}

export function matchToken(endpoint, token) {}
