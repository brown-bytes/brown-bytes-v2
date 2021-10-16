'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.EventComment, {as: 'comments'});
      this.hasMany(models.EventWatch, {as: 'watches'});
      this.belongsTo(models.User, {as: 'creator'});
    }
  };
  Event.init({
    creatorId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        timeValidator(value) {
          if (value <= this.startTime) {
            throw new Error("endTime must be later than startTime");
          }
        }
      }
    },
    admittance: DataTypes.STRING,
    otherInfo: DataTypes.STRING,
    hostGroup: DataTypes.STRING,
    eventType: DataTypes.STRING,
    foodType: DataTypes.STRING,
    foodAmount: DataTypes.STRING,
    link: DataTypes.STRING,
    visible: DataTypes.BOOLEAN,
    scraped: DataTypes.BOOLEAN,
    keywords: DataTypes.STRING,
    eventTags: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};