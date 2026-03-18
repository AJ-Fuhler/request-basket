import type { Request, Response, NextFunction } from "express";
export declare const basketController: {
    handleSSEConnection(req: Request<{
        endpoint: string;
    }>, res: Response, next: NextFunction): void;
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