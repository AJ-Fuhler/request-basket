import type { Request, Response } from "express";
import { mongoModel } from "../models/mongoModel";
import { pgModel } from "../models/pgModel";
import type { RequestData } from "../types/requests";
// import { type WebSocket } from "ws";

// const wsConnections = new Map();

function isEndpoint(endpoint: string | string[] | undefined): endpoint is string {
  if (endpoint && typeof endpoint === "string") {
    return true;
  } else {
    return false;
  }
}

export const basketController = {
  // handleGetBaskets(req: Request, res: Response) {
  //   // Serve React app.
  //   res.send("Hello world");
  // },

  // handleRedirectToBaskets(req: Request, res: Response) {
  //   res.redirect("/baskets");
  // },

  async handleGetBasketRequests(req: Request, res: Response) {
    const { endpoint } = req.params;
  
    if (isEndpoint(endpoint)) {
      try {
        const requests = await mongoModel.getBasketRequests(endpoint)
        res.status(200).json(requests);
      } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Failed to retrieve basket"});
      }
    } else {
      res.status(400).json({ error: "Invalid or empty endpoint." });
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
    const { method, headers, body } = req;

    if (isEndpoint(endpoint)) {
      const data: RequestData = {
        endpoint,
        method,
        headers,
        body,
      };
      
      try {
        await mongoModel.addWebhookRequest(data);
        res.status(200).json({ msg: "Webhook message received." });
      } catch (e) {
        console.error(e);
        res.status(400).json({ error: 'Webhook request failed.'});
      }
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
      res.status(400).json({ error: "Invalid or empty endpoint." });
    }  
  },
};
