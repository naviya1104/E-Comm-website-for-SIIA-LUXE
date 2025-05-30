const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const SlideImage = sequelize.define('SlideImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING,
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'slide_images',
  timestamps: true,
});

module.exports = SlideImage;
