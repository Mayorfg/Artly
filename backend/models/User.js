// models/User.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(100), allowNull: false },
  role: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'user' },
  profile_picture_url: { type: DataTypes.STRING },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

// Do not define associations here
// Do not require other models here

module.exports = User;