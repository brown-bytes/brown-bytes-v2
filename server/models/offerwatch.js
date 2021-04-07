'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OfferWatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Offer, {as: 'offer'});
      this.belongsTo(models.User, {as: 'watcher'});
    }
  };
  OfferWatch.init({
    offerId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'offers'
        },
        key: 'id'
      },
      allowNull: false
    },
    watcherId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OfferWatch',
  });
  return OfferWatch;
};