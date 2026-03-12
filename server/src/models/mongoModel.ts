import mongoose from "mongoose";
import type { RequestData } from "../types/requests";
import { requestSchema } from "./mongoSchema";

const Request = mongoose.model("Request", requestSchema);

export const mongoModel = {
  async getBasketRequests(endpoint: string) {
    try {
      const documents = await Request.find({ endpoint });
      return JSON.stringify(documents);
    } catch (e) {
      console.error(e);
      throw new Error("Failed to retrieve basket");
    }
  },

  async addWebhookRequest(data: RequestData) {
    const newRequest = new Request(data);

    try {
      await newRequest.save();
    } catch (e) {
      console.error(e);
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
