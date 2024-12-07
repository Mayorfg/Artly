// controllers/artworkController.js
const { ArtworkPost, User } = require('../models');
const { Op } = require('sequelize');

exports.createArtwork = async (req, res) => {
  try {
    const { title, description, image_data, tags } = req.body;
    const image_data_buffer = image_data.buffer;
    const newPost = await ArtworkPost.create({
      user_id: req.user.user_id,
      title,
      description,
      image_data: image_data_buffer,
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
      include: [{ model: User, attributes: ['name', 'profile_picture_data'] }],
      order: [['created_at', 'DESC']],
    });
    if (artworks.image_data) {
      const buffer = Buffer.from(artworks.image_data);
      artworks.image_data = buffer.toString('base64');
    }
    res.json(artworks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getArtworkById = async (req, res) => {
  try {
    const artwork = await ArtworkPost.findByPk(req.params.post_id, {
      include: [{ model: User, attributes: ['name', 'profile_picture_data'] }],
    });
    if (!artwork) return res.status(404).json({ error: 'Artwork not found' });
    if (artwork.image_data) {
      const buffer = Buffer.from(artwork.image_data);
      artwork.image_data = buffer.toString('base64');
    }
    res.json(artwork);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};