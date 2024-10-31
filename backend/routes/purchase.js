// routes/purchase.js
const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const authenticate = require('../middleware/authenticate');

router.get('/token/:artworkId', authenticate, purchaseController.getPurchaseToken);

module.exports = router;