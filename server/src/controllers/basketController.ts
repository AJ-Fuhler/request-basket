import type { Request, Response } from "express";
import { mongoModel } from "../models/mongoModel";
import { pgModel } from "../models/pgModel";
import { type WebSocket } from "ws";
import type { IncomingHttpHeaders } from "node:http";

export interface RequestData {
  endpoint: string;
  method: string;
  headers: IncomingHttpHeaders;
  body: string;
}

const wsConnections = new Map();

export function isEndpoint(endpoint: string | string[] | undefined): endpoint is string {
  if (endpoint && typeof endpoint === "string") {
    return true;
  } else {
    return false;
  }
}

export const basketController = {
  handleGetBaskets(req: Request, res: Response) {
    // Serve React app.
    res.send("Hello world");
  },

  handleRedirectToBaskets(req: Request, res: Response) {
    res.redirect("/baskets");
  },

  async handleGetBasketRequests(ws: WebSocket, req: Request) {
    const { endpoint } = req.params;
    wsConnections.set(endpoint, ws);

    ws.on('close', () => {
      console.log('WS disconnected');
    });
  
    if (isEndpoint(endpoint)) {
      try {
        const requests = await mongoModel.getBasketRequests(endpoint)
        ws.send(requests);
      } catch (e) {
        let errorMsg = "Failed to get basket requests";
        ws.send(errorMsg);
      }
    } else {
      let errorMsg = "Invalid or empty endpoint";
      ws.send(errorMsg);
    }
  },

  async handleCreateNewBasket(req: Request, res: Response) {
    const { endpoint } = req.params;

    if (isEndpoint(endpoint)) {
      if (await pgModel.basketExists(endpoint)) {
        res.status(409).json({ error: "Endpoint already taken. Please choose another endpoint." });
      } else {

        try {
          pgModel.addNewBasket(endpoint);
          res.status(200).json({ message: "endpoint is available", token: "..." });
        } catch (e) {
          res.status(400).json({ error: "Basket could not be created." });
        }
      }
    } else {
      res.status(400).json({ error: "Invalid or empty endpoint." });
    }
  },

  async handleWebhookRequest(req: Request, res: Response) {
    const { endpoint } = req.params;
    const { token: sentToken } = req.body.token;
    const { method, headers, body } = req;

    if (isEndpoint(endpoint)) {

      const json: RequestData = {
        endpoint,
        method,
        headers,
        body,
      };
      
      const savedToken = await pgModel.getBasketToken(endpoint);

      if (savedToken === sentToken) {
        try {
          mongoModel.addWebhookRequest(json);
          const wsConnection = wsConnections.get(endpoint);

          if (wsConnection) {
            wsConnection.send(JSON.stringify(json));
          }

          res.sendStatus(200);
        } catch (e) {
          res.sendStatus(400).json({ error: 'Webhook request failed.'});
        }
      } else {
        res.status(400).json({ error: "Invalid basket token" });
      }
    } else {
      res.status(400).json({ error: "Invalid or empty endpoint." });
    }
  },

  async handleClearBasket(req: Request, res: Response) {
    const { endpoint } = req.params;

    if (isEndpoint(endpoint)) {
      if (await pgModel.basketExists(endpoint)) {
        try {
          const { deletedCount } = await mongoModel.clearBasket(endpoint);
          res.status(200).json({ deletedCount });
        } catch (e) {
          res.status(400).json({ error: "Basket could not be cleared." });
        }
      } else {
        res.status(400).json({ error: "Basket doesn't exist!" });
      }
    } else {
      res.status(400).json({ error: "Invalid basket endpoint" });
    }  
  },
};
