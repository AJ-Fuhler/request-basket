import type { Request, Response } from "express";
import { mongoModel } from "../models/mongoModel";
import { pgModel } from "../models/pgModel";
import { type WebSocket } from "ws";

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

    console.log(req.params);

    if (endpoint) {
      const requests = await mongoModel.getBasketRequests(endpoint);
      ws.send(requests);
    } else {
      ws.send([]);
    }
  },

  handleCreateNewBasket(req: Request, res: Response) {
    const { endpoint } = req.params;

    // concurrent request to same endpoint by different user?
    if (pgModel.basketExists(endpoint)) {
      res.status(409).json({ message: "Endpoint name is invalid." });
    } else {
      // Generate JWT token for user.
      // This is stored locally in browser.
      // If user tries to access same endpoint with different/altered token, respond with 401 message.
      pgModel.addNewBasket(endpoint);
      res.status(200).json({ message: "endpoint is available", token: "..." });
    }
  },

  handleWebhookRequest(req: Request, res: Response) {
    const { endpoint } = req.params;
    // console.log(req.params);
    const { method, headers, body } = req;
    const timestamp = new Date();
    const json = {
      method: method,
      headers: headers,
      body: body,
      timestamp: timestamp,
    };

    // mongoModel.addWebhookRequest(endpoint, json);

    // user -> `/baksets/1234abc` (websocket connection) -> add this connection to a list
    // whenever a webhook request collects and stores request data,
    // find the connection associated with the request's endpoint 
    // send the request JSON to the user via associate websocket

    // Send the newly created request to `/baskets/:endpoint`? via websocket?
    // with ...?
    // 

    res.status(200);
  },

  handleClearBasket(req: Request, res: Response) {
    const { endpoint } = req.params;

    if (pgModel.basketExists(endpoint)) {
      pgModel.clearBasket(endpoint);
      res.status(200);
    } else {
      res.status(400).send({ message: "Basket doesn't exist!" });
    }
  },
};
