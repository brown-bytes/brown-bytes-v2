'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Event, {as: 'event'});
      this.belongsTo(models.User, {as: 'poster'});
    }
  };
  EventComment.init({
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'events'
        },
        key: 'id'
      },
      allowNull: false
    },
    posterId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      },
      allowNull: false
    },
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EventComment',
  });
  return EventComment;
};