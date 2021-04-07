"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("events", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			creatorId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "users",
					},
					key: "id",
				},
        onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			location: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			eventDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			startTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			endTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			admittance: Sequelize.STRING,
			otherInfo: Sequelize.STRING,
			hostGroup: Sequelize.STRING,
			eventType: Sequelize.STRING,
			foodType: Sequelize.STRING,
			foodAmount: Sequelize.STRING,
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
		await queryInterface.dropTable("events");
	},
};
