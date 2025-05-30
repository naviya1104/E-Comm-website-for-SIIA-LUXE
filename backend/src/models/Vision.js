const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Vision = sequelize.define('Vision', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'vision',
  timestamps: true,
});

module.exports = Vision;
