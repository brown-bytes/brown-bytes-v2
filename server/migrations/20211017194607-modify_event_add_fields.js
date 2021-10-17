'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        'Events', // table name
        'link', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Events', // table name
        'visible', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Events', // table name
        'scraped', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Events', // table name
        'keywords', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Events', // table name
        'eventTags', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn(
        'Events', // table name
        'link', // new field name
      ),
      queryInterface.removeColumn(
        'Events', // table name
        'visible', // new field name
      ),
      queryInterface.removeColumn(
        'Events', // table name
        'scraped', // new field name
      ),
      queryInterface.removeColumn(
        'Events', // table name
        'keywords', // new field name
      ),
      queryInterface.removeColumn(
        'Events', // table name
        'eventTags', // new field name
      ),
    ]);
  }
};
