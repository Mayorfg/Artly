// routes/messages.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, messageController.sendMessage);
router.get('/:user_id', authenticate, messageController.getMessages);

module.exports = router;