// models/Interaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const ArtworkPost = require('./ArtworkPost');

const Interaction = sequelize.define('Interaction', {
  interaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ArtworkPost,
      key: 'post_id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  interaction_type: {
    type: DataTypes.ENUM('like', 'comment', 'share'),
    allowNull: false,
  },
  content: { type: DataTypes.TEXT },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'interactions',
  timestamps: false,
});

Interaction.belongsTo(User, { foreignKey: 'user_id' });
Interaction.belongsTo(ArtworkPost, { foreignKey: 'post_id' });

module.exports = Interaction;