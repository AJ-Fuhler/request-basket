import { Router } from 'express';
import { basketController } from '../controllers/basketController';

const router = Router();

// Homepage - serve React app
// GET all user baskets
router.get('/baskets', basketController.handleGetBaskets);

// Redirect root path to `/baskets`
router.get('/', basketController.handleRedirectToBaskets);

// Get all requests for a specific.
router.get('/baskets/:endpoint', basketController.handleGetBasketRequests);

// POST: Create a new basket.
router.post('/:endpoint', basketController.handleCreateNewBasket);

// PUT: Clear a basket
router.put('/:endpoint/clear', basketController.handleClearBasket);