import mongoose from "mongoose";
import type { RequestData } from "../controllers/basketController";

const { Schema } = mongoose;
const requestSchema = new Schema({
  endpoint: String,
  method: String,
  headers: [String],
  body: String,
});

const Request = mongoose.model("Request", requestSchema);

export const mongoModel = {
  async getBasketRequests(endpoint: string) {
    const documents = await Request.find({ endpoint });
    const requests = documents.map((document) => document.toJSON());
    return JSON.stringify(requests);
  },

  async addWebhookRequest(payload: RequestData) {
    const newRequest = new Request(payload);

    try {
      await newRequest.save();
    } catch (e) {
      throw new Error('Failed to save request to DB');
    }
  },
  
  async clearBasket(endpoint: string) {
    try {
      return await Request.deleteMany({ endpoint });  // => Promise<{ acknowledge: booolean, deleteCount: number }>
    } catch (e) {
      const errorMessage = "Failed to clear requests from basket."
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
};
