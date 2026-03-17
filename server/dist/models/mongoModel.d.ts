import mongoose from "mongoose";
import type { RequestData } from "../types/requests.js";
export declare const mongoModel: {
    getBasketRequests(endpoint: string): Promise<(mongoose.Document<unknown, {}, {
        endpoint?: string | null;
        method?: string | null;
        body?: string | null;
        headers?: Map<string, string> | null;
    }, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<{
        endpoint?: string | null;
        method?: string | null;
        body?: string | null;
        headers?: Map<string, string> | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    })[]>;
    addWebhookRequest(data: RequestData): Promise<void>;
    clearBasket(endpoint: string): Promise<mongoose.mongo.DeleteResult>;
};
//# sourceMappingURL=mongoModel.d.ts.map