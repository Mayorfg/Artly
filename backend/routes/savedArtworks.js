// routes/savedArtworks.js
const express = require('express');
const router = express.Router();
const savedArtworkController = require('../controllers/savedArtworkController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, savedArtworkController.saveArtwork);
router.get('/', authenticate, savedArtworkController.getSavedArtworks);

module.exports = router;