// routes/interactions.js
const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, interactionController.createInteraction);
router.get('/:post_id', interactionController.getInteractionsByPost);

module.exports = router;