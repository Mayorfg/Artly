// models/index.js
const sequelize = require('../config/database');

const User = require('./User');
const Follow = require('./Follow');
const ArtworkPost = require('./ArtworkPost');
const Interaction = require('./Interaction');
const Messages = require('./Messages');
const Notification = require('./Notification');
const SavedArtwork = require('./SavedArtwork');
// ... import other models

// Define associations after all models are imported
Follow.belongsTo(User, { as: 'Follower', foreignKey: 'follower_id' });
Follow.belongsTo(User, { as: 'Following', foreignKey: 'following_id' });

User.hasMany(Follow, { as: 'Followers', foreignKey: 'following_id' });
User.hasMany(Follow, { as: 'Following', foreignKey: 'follower_id' });

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Follow,
  ArtworkPost,
  Interaction,
  Notification,
  SavedArtwork
  // ... other models
};