import type { Response } from "express";
export declare const sseManager: {
    addClient(endpoint: string, res: Response): void;
    removeClient(endpoint: string, res: Response): void;
    broadcast(endpoint: string, data: unknown): void;
};
//# sourceMappingURL=sseManager.d.ts.map