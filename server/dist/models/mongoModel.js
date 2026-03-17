import mongoose from "mongoose";
import { requestSchema } from "./mongoSchema.js";
const Request = mongoose.model("Request", requestSchema);
export const mongoModel = {
    async getBasketRequests(endpoint) {
        try {
            const documents = await Request.find({ endpoint });
            return documents;
        }
        catch (e) {
            console.error(e);
            throw new Error("Failed to retrieve basket");
        }
    },
    async addWebhookRequest(data) {
        const newRequest = new Request(data);
        try {
            await newRequest.save();
        }
        catch (e) {
            console.error(e);
            throw new Error('Failed to save request to DB');
        }
    },
    async clearBasket(endpoint) {
        try {
            return await Request.deleteMany({ endpoint });
        }
        catch (e) {
            console.error(e);
            throw new Error("Failed to clear basket.");
        }
    }
};
//# sourceMappingURL=mongoModel.js.map