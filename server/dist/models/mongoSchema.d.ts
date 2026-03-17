import mongoose from "mongoose";
export declare const requestSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    endpoint?: string | null;
    method?: string | null;
    body?: string | null;
    headers?: Map<string, string> | null;
}, mongoose.Document<unknown, {}, {
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
}, unknown, {
    endpoint?: string | null;
    method?: string | null;
    body?: string | null;
    headers?: {
        [x: string]: string;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=mongoSchema.d.ts.map