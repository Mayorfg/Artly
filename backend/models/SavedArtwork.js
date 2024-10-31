// models/SavedArtwork.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const ArtworkPost = require('./ArtworkPost');

const SavedArtwork = sequelize.define('SavedArtwork', {
  saved_artwork_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
    allowNull: false,
  },
  artwork_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ArtworkPost,
      key: 'post_id',
    },
    allowNull: false,
  },
  saved_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'saved_artworks',
  timestamps: false,
});

SavedArtwork.belongsTo(User, { foreignKey: 'user_id' });
SavedArtwork.belongsTo(ArtworkPost, { foreignKey: 'artwork_id' });

module.exports = SavedArtwork;