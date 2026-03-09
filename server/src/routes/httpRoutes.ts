import { basketController } from "../controllers/basketController";
import type { Router } from 'express';

export function registerHttpRoutes(router: Router) {
  // Homepage - serve React app
  // GET all user baskets
  router.get("/baskets", basketController.handleGetBaskets);

  // Redirect root path to `/baskets`
  router.get("/", basketController.handleRedirectToBaskets);

  // POST: Create a new basket.
  router.post("/baskets/:endpoint", basketController.handleCreateNewBasket);

  // POST: Send a requests to a specific basket.
  router.all("/:endpoint", basketController.handleWebhookRequest);

  // PUT: Clear a basket
  router.put("/:endpoint/clear", basketController.handleClearBasket);
}