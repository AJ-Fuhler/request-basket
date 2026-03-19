import { basketController } from "../controllers/basketController.js";
import type { Router } from 'express';

export function registerHttpRoutes(router: Router) {
  console.log("[routes] Registering HTTP routes...");

  // router.get("/baskets", basketController.handleGetBaskets);

  // router.get("/", basketController.handleRedirectToBaskets);

  router.get("/baskets/:endpoint", basketController.handleGetBasketRequests);

  router.post("/baskets/create/:endpoint", basketController.handleCreateNewBasket);

  router.get("/:endpoint/sse", basketController.handleSSEConnection);

  router.all("/:endpoint", basketController.handleWebhookRequest);

  router.put("/:endpoint/clear", basketController.handleClearBasket);

  router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });
}