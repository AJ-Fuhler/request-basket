import { basketController } from "../controllers/basketController.js";
import type { Router } from 'express';

export function registerHttpRoutes(router: Router) {
  // router.get("/baskets", basketController.handleGetBaskets);

  // router.get("/", basketController.handleRedirectToBaskets);

  router.get("/baskets/:endpoint", basketController.handleGetBasketRequests);

  router.post("/baskets/create/:endpoint", basketController.handleCreateNewBasket);

  router.get("/:endpoint", basketController.handleSSEConnection);

  router.all("/:endpoint", basketController.handleWebhookRequest);

  router.put("/:endpoint/clear", basketController.handleClearBasket);
}