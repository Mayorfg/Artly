// models/Follow.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Follow extends Model {}

Follow.init({
  follow_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  follower_id: { type: DataTypes.INTEGER, allowNull: false },
  following_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
  sequelize,
  modelName: 'Follow',
  tableName: 'follows',
  timestamps: false,
});

// Do not define associations here
// Do not require other models here

module.exports = Follow;