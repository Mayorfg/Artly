// controllers/savedArtworkController.js
const { SavedArtwork, ArtworkPost, User } = require('../models');

exports.saveArtwork = async (req, res) => {
  try {
    const { artwork_id } = req.body;

    await SavedArtwork.create({
      user_id: req.user.user_id,
      artwork_id,
    });

    res.status(201).json({ message: 'Artwork saved' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSavedArtworks = async (req, res) => {
  try {
    const savedArtworks = await SavedArtwork.findAll({
      where: { user_id: req.user.user_id },
      include: [
        {
          model: ArtworkPost,
          include: [{ model: User, attributes: ['name'] }],
        },
      ],
    });

    res.json(savedArtworks.map(sa => sa.ArtworkPost));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};