// models/ArtworkPost.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const ArtworkPost = sequelize.define('ArtworkPost', {
  post_id: {
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
  },
  title: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT },
  image_url: { type: DataTypes.STRING, allowNull: false },
  tags: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'artwork_posts',
  timestamps: false,
});

ArtworkPost.belongsTo(User, { foreignKey: 'user_id' });

module.exports = ArtworkPost;