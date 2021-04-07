"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("EventWatches", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			eventId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Events",
					},
					key: "id",
				},
        onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				allowNull: false,
			},
			watcherId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Users",
					},
					key: "id",
				},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("EventWatches");
	},
};
