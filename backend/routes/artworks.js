// routes/artworks.js
const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');
const authenticate = require('../middleware/authenticate');
const ArtworkPost = require('../models/ArtworkPost')

router.post('/', authenticate, artworkController.createArtwork);
router.get('/', artworkController.getArtworks);
router.get('/:post_id', artworkController.getArtworkById);
router.get('/featured', async (req, res) => {
  try {
    const artworks = await ArtworkPost.findAll({
      limit: 3,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    if (artworks.image_data) {
      const buffer = Buffer.from(artworks.image_data);
      artworks.image_data = buffer.toString('base64');
    }
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;