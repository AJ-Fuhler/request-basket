import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.SECRET_KEY!;

export function generateToken(endpoint: string) {
  const payload = { endpoint };
  return jwt.sign(payload, secret);
}
