import jwt from "jsonwebtoken";
export function generateToken(endpoint) {
    return jwt.sign(endpoint, process.env.SECRET_KEY);
}
//# sourceMappingURL=token.js.map