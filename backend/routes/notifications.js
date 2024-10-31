// routes/notifications.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, notificationController.getNotifications);
router.put('/:notification_id', authenticate, notificationController.markAsRead);

module.exports = router;