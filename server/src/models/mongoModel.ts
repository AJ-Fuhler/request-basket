import mongoose from "mongoose";

const { Schema } = mongoose;
const requestSchema = new Schema({
  url: String,
  method: String,
  headers: [String],
  body: String,
});

const Request = mongoose.model("Request", requestSchema);

export const mongoModel = {
  async getBasketRequests(endpoint: string) {
    const documents = await Request.find({ url: endpoint });
    const requests = documents.map((document) => document.toJSON());
    return JSON.stringify(requests);
  },

  async addWebhookRequest(endpoint: String, payload: typeof requestSchema) {
    const newRequest = new Request({ url: endpoint, ...payload });
    await newRequest.save();
  },
};
