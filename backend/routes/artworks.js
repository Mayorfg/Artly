// routes/artworks.js
const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');
const authenticate = require('../middleware/authenticate');

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
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;