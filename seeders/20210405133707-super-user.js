"use strict";
const auth = require("../auth");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		return queryInterface.bulkInsert("users", [
			{
				userName: "admin",
				email: "brownbytes@brownbytes.bb",
				password: auth.hashPassword("csci1320"),
				avatar: "images/default_avatar.png",
				isActive: true,
				admin: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete("users", null, {});
	},
};
