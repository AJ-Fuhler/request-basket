import { basketController } from "../controllers/basketController";
import type { Router } from 'express';

export function registerHttpRoutes(router: Router) {
  // router.get("/baskets", basketController.handleGetBaskets);

  // router.get("/", basketController.handleRedirectToBaskets);

  router.post("/baskets/:endpoint", basketController.handleCreateNewBasket);

  router.all("/:endpoint", basketController.handleWebhookRequest);

  router.put("/:endpoint/clear", basketController.handleClearBasket);
}