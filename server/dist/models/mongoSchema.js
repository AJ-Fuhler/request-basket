import mongoose from "mongoose";
const { Schema } = mongoose;
export const requestSchema = new Schema({
    endpoint: String,
    method: String,
    headers: { type: Map, of: String },
    body: String,
});
//# sourceMappingURL=mongoSchema.js.map