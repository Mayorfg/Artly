// controllers/followController.js
const { Follow, User, Notification, ArtworkPost } = require('../models');

exports.followUser = async (req, res) => {
  try {
    const { following_id } = req.body;
    if (req.user.user_id === following_id) {
      return res.status(400).json({ error: "You cannot follow yourself." });
    }

    const existingFollow = await Follow.findOne({
      where: {
        follower_id: req.user.user_id,
        following_id,
      },
    });

    if (existingFollow) {
      return res.status(400).json({ error: "You are already following this user." });
    }

    await Follow.create({
      follower_id: req.user.user_id,
      following_id,
    });

    // Create a notification for the followed user
    await Notification.create({
      user_id: following_id,
      type: 'follow',
      content: `${req.user.name} started following you.`,
    });

    res.json({ message: "Successfully followed the user." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const { following_id } = req.body;

    const existingFollow = await Follow.findOne({
      where: {
        follower_id: req.user.user_id,
        following_id,
      },
    });

    if (!existingFollow) {
      return res.status(400).json({ error: "You are not following this user." });
    }

    await Follow.destroy({
      where: {
        follower_id: req.user.user_id,
        following_id,
      },
    });

    res.json({ message: "Successfully unfollowed the user." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const following = await Follow.findAll({
      where: { follower_id: userId },
      include: [{ model: User, as: 'Following', attributes: ['user_id', 'name', 'profile_picture_data'] }],
    });

    res.json(following.map(f => f.Following));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const followers = await Follow.findAll({
      where: { following_id: userId },
      include: [{ model: User, as: 'Follower', attributes: ['user_id', 'name', 'profile_picture_data'] }],
    });

    res.json(followers.map(f => f.Follower));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFollowingArtworks = async (req, res) => {
  try {
    const userId = req.user.user_id;

    // Get the IDs of the artists the user is following
    const following = await Follow.findAll({
      where: { follower_id: userId },
      attributes: ['following_id'],
    });
    const followingIds = following.map(f => f.following_id);

    // Get artworks from followed artists
    const artworks = await ArtworkPost.findAll({
      where: { user_id: followingIds },
      include: [
        {
          model: User,
          attributes: ['user_id', 'name', 'profile_picture_data'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    res.json(artworks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};