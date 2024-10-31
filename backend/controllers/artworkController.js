// controllers/artworkController.js
const { ArtworkPost, User } = require('../models');
const { Op } = require('sequelize');

exports.createArtwork = async (req, res) => {
  try {
    const { title, description, image_url, tags } = req.body;
    const newPost = await ArtworkPost.create({
      user_id: req.user.user_id,
      title,
      description,
      image_url,
      tags,
    });

    // Notify followers
    const followers = await Follow.findAll({
      where: { following_id: req.user.user_id },
      include: [{ model: User, as: 'Follower', attributes: ['user_id', 'fcm_token'] }],
    });

    const notifications = followers.map(follower => ({
      user_id: follower.follower_id,
      type: 'new_artwork',
      content: `${req.user.name} posted a new artwork.`,
    }));

    await Notification.bulkCreate(notifications);

    res.status(201).json({ message: 'Artwork posted successfully', post_id: newPost.post_id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getArtworks = async (req, res) => {
  try {
    const { tag, user_id, popularity } = req.query;
    let whereClause = {};
    if (tag) {
      whereClause.tags = { [Op.like]: `%${tag}%` };
    }
    if (user_id) {
      whereClause.user_id = user_id;
    }
    const artworks = await ArtworkPost.findAll({
      where: whereClause,
      include: [{ model: User, attributes: ['name', 'profile_picture_url'] }],
      order: [['created_at', 'DESC']],
    });
    res.json(artworks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getArtworkById = async (req, res) => {
  try {
    const artwork = await ArtworkPost.findByPk(req.params.post_id, {
      include: [{ model: User, attributes: ['name', 'profile_picture_url'] }],
    });
    if (!artwork) return res.status(404).json({ error: 'Artwork not found' });
    res.json(artwork);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};