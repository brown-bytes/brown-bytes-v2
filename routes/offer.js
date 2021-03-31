const router = require("express").Router();
const User = require("../models").User;
const Offer = require("../models").Offer;
const OfferComment = require("../models").OfferComment;
const OfferWatch = require("../models").OfferWatch;
const bodyParser = require("body-parser");
const auth = require("../auth");
const { Op } = require("sequelize");

router.use(bodyParser.json());

router
	.route("/")
	.get(async (req, res) => {
		let currentTime = new Date();
		await Offer.findAll({
			where: {
				endTime: {
					[Op.gt]: currentTime,
				},
			},
			include: [
				{
					model: User,
					as: "creator",
					attributes: ["username", "avatar"],
				},
				{
					model: OfferComment,
					as: "comments",
					include: {
						model: User,
						as: "poster",
						attributes: ["username", "avatar"],
					},
				},
				{ model: OfferWatch, as: "watches" },
			],
		})
			.then((offers) => {
				for (let i = 0; i < offers.length; i++) {
					offers[i] = offers[i].get({ plain: true });
					offers[i].avatarURL = offers[i].creator.avatar;
					offers[i].creator = offers[i].creator.username;
					delete offers[i].watches;
				}
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json({ success: true, offers: offers });
			})
			.catch((err) => {
				console.log(err);
				res.statusCode = 400;
				res.setHeader("Content-Type", "application/json");
				if (err.hasOwnProperty("errors")) {
					res.json({ error: err.errors[0].message });
				} else if (
					err.hasOwnProperty("original") &&
					err.original.hasOwnProperty("sqlMessage")
				) {
					res.json({ error: err.original.sqlMessage });
				} else {
					res.json({ error: "" });
				}
			});
	})
	.post(auth.parseToken, async (req, res) => {
		await Offer.create({
			creatorId: req.decoded.id,
			isAnonymous: req.body.anonymous,
			description: req.body.description,
			location: req.body.location,
			date: req.body.date,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			otherInfo: req.body.otherInfo,
		})
			.then((offer) => {
				if (offer) {
					// console.log(offer.id);
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: true,
						status: "Successfully created offer",
						offerId: offer.id,
					});
				} else {
					res.statusCode = 400;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: false,
						error: "Offer creation failed",
					});
				}
			})
			.catch((err) => {
				console.log(err);
				res.statusCode = 400;
				res.setHeader("Content-Type", "application/json");
				if (err.hasOwnProperty("errors")) {
					res.json({ error: err.errors[0].message });
				} else if (
					err.hasOwnProperty("original") &&
					err.original.hasOwnProperty("sqlMessage")
				) {
					res.json({ error: err.original.sqlMessage });
				} else {
					res.json({ error: "" });
				}
			});
	});

router.delete("/:offerId", auth.parseToken, async (req, res) => {
	await Offer.destroy({
		where: {
			id: req.params.offerId,
			creatorId: req.decoded.id,
		},
	})
		.then((rows) => {
			if (rows > 0) {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json({
					success: true,
					status: "Successfully deleted offer",
				});
			} else {
				res.statusCode = 403;
				res.setHeader("Content-Type", "application/json");
				res.json({
					success: false,
					error: "Unauthorized to delete the offer",
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.statusCode = 400;
			res.setHeader("Content-Type", "application/json");
			if (err.hasOwnProperty("errors")) {
				res.json({ error: err.errors[0].message });
			} else if (
				err.hasOwnProperty("original") &&
				err.original.hasOwnProperty("sqlMessage")
			) {
				res.json({ error: err.original.sqlMessage });
			} else {
				res.json({ error: "" });
			}
		});
});

router.post("/comment/:offerId", auth.parseToken, async (req, res) => {
	await OfferComment.create({
		offerId: req.params.offerId,
		posterId: req.decoded.id,
		content: req.body.content,
	})
		.then((comment) => {
			if (comment) {
				console.log(comment.id);
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json({
					success: true,
					status: "Successfully posted comment",
					commentTime: comment.createdAt,
				});
			} else {
				res.statusCode = 400;
				res.setHeader("Content-Type", "application/json");
				res.json({ success: false, error: "Comment creation failed" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.statusCode = 400;
			res.setHeader("Content-Type", "application/json");
			if (err.hasOwnProperty("errors")) {
				res.json({ error: err.errors[0].message });
			} else if (
				err.hasOwnProperty("original") &&
				err.original.hasOwnProperty("sqlMessage")
			) {
				res.json({ error: err.original.sqlMessage });
			} else {
				res.json({ error: "" });
			}
		});
});

module.exports = router;
