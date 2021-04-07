'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OfferComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Offer, {as: 'offer'});
      this.belongsTo(models.User, {as: 'poster'});
    }
  };
  OfferComment.init({
    offerId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Offers'
        },
        key: 'id'
      },
      allowNull: false
    },
    posterId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OfferComment',
  });
  return OfferComment;
};