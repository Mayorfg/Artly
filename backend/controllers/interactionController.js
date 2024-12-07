// controllers/interactionController.js
const { Interaction, Notification, ArtworkPost, User } = require('../models');

exports.createInteraction = async (req, res) => {
  try {
    const { post_id, interaction_type, content } = req.body;
    const newInteraction = await Interaction.create({
      post_id,
      user_id: req.user.user_id,
      interaction_type,
      content,
    });

    // Send notification to the artist
    const artwork = await ArtworkPost.findByPk(post_id);
    if (artwork && artwork.user_id !== req.user.user_id) {
      await Notification.create({
        user_id: artwork.user_id,
        type: interaction_type,
        content: `Your artwork received a new ${interaction_type}`,
      });
      // Here, you would also trigger real-time notification (e.g., via FCM)
    }

    res.status(201).json({ message: 'Interaction recorded', interaction_id: newInteraction.interaction_id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getInteractionsByPost = async (req, res) => {
  try {
    const interactions = await Interaction.findAll({
      where: { post_id: req.params.post_id },
      include: [{ model: User, attributes: ['name', 'profile_picture_data'] }],
    });
    res.json(interactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};