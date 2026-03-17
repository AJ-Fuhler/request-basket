import type { Request, Response } from "express";
export declare const basketController: {
    handleGetBasketRequests(req: Request<{
        endpoint: string;
    }>, res: Response): Promise<void>;
    handleCreateNewBasket(req: Request<{
        endpoint: string;
    }>, res: Response): Promise<void>;
    handleWebhookRequest(req: Request<{
        endpoint: string;
    }>, res: Response): Promise<void>;
    handleClearBasket(req: Request<{
        endpoint: string;
    }>, res: Response): Promise<void>;
};
//# sourceMappingURL=basketController.d.ts.map