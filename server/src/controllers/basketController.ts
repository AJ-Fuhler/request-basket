import type { Request, Response } from "express";
import { mongoModel } from "../models/mongoModel.js";
import { pgModel } from "../models/pgModel.js";
import type { RequestData } from "../types/requests.js";

export const basketController = {
  // handleGetBaskets(req: Request, res: Response) {
  //   // Serve React app.
  //   res.send("Hello world");
  // },

  // handleRedirectToBaskets(req: Request, res: Response) {
  //   res.redirect("/baskets");
  // },

  async handleGetBasketRequests(req: Request<{ endpoint: string }>, res: Response) {
    const { endpoint } = req.params;

    try {
      const requests = await mongoModel.getBasketRequests(endpoint)
      res.status(200).json(requests);
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: "Failed to retrieve basket"});
    }
  },

  async handleCreateNewBasket(req: Request<{ endpoint: string }>, res: Response) {
    console.log("in handleCreateNewBasket");
    const { endpoint } = req.params;
    let basketExists;

    try {
      basketExists = await pgModel.basketExists(endpoint);

      if (basketExists) {
        res.status(409).json({ error: "Endpoint already taken. Please choose another endpoint." });
      } else {

        try {
          const token = await pgModel.addNewBasket(endpoint);
          res.status(200).json({ [`basket_${endpoint}`]: token });
        } catch (e) {
          res.status(400).json({ error: "Basket could not be created." });
        }
      }
    } catch (e) {
      console.error(e);
    }
  },

  async handleWebhookRequest(req: Request<{ endpoint: string }>, res: Response) {
    const { endpoint } = req.params;
    const { method, headers, body } = req;

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
  },

  async handleClearBasket(req: Request<{ endpoint: string }>, res: Response) {
    const { endpoint } = req.params;

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
  },
};
