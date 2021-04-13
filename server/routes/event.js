const router = require("express").Router();
const User = require("../models").User;
const Event = require("../models").Event;
const EventWatch = require("../models").EventWatch;
const EventComment = require("../models").EventComment;
const bodyParser = require("body-parser");
const auth = require("../auth");
const { Op } = require("sequelize");

router.use(bodyParser.json());

router
	.route("/")
	.get(async (req, res) => {
		let currentTime = new Date();
		await Event.findAll({
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
					model: EventComment,
					as: "comments",
					include: {
						model: User,
						as: "poster",
						attributes: ["username", "avatar"],
					},
				},
				{ model: EventWatch, as: "watches" },
			],
		})
			.then((events) => {
				for (let i = 0; i < events.length; i++) {
					events[i] = events[i].get({ plain: true });
					events[i].numWatches = events[i].watches.length;
					// events[i].avatarURL = events[i].creator.avatar;
					events[i].creator = events[i].creator.username;
					//delete events[i].creator;
					delete events[i].watches;
				}
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json({ success: true, events: events });
			})
			.catch((err) => {
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
		await Event.create({
			creatorId: req.decoded.id,
			title: req.body.title,
			location: req.body.location,
			eventDate: req.body.date,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			hostGroup: req.body.hostGroup,
			eventType: req.body.eventType,
			admittance: req.body.whoCanCome,
			foodType: req.body.foodType,
			foodAmount: req.body.foodAmount,
			otherInfo: req.body.otherInfo,
		})
			.then((event) => {
				if (event) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: true,
						status: "Successfully created event",
						eventId: event.id,
					});
				} else {
					res.statusCode = 400;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: false,
						error: "Event creation failed",
					});
				}
			})
			.catch((err) => {
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

router.delete("/:eventId", auth.parseToken, async (req, res) => {
	if (req.decoded.admin) {
		await Event.destroy({
			where: {
				id: req.params.eventId,
			},
		})
			.then((rows) => {
				if (rows > 0) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: true,
						status: "Successfully deleted event",
					});
				} else {
					res.statusCode = 403;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: false,
						error: "Unauthorized to delete the event",
					});
				}
			})
			.catch((err) => {
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
	} else {
		await Event.destroy({
			where: {
				id: req.params.eventId,
				creatorId: req.decoded.id,
			},
		})
			.then((rows) => {
				if (rows > 0) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: true,
						status: "Successfully deleted event",
					});
				} else {
					res.statusCode = 403;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: false,
						error: "Unauthorized to delete the event",
					});
				}
			})
			.catch((err) => {
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
	}
});

router.get("/watched", auth.parseToken, async (req, res) => {
	await EventWatch.findAll({
		where: {
			watcherId: req.decoded.id,
		},
		include: [
			{
				model: Event,
				as: "event",
				include: [
					{
						model: User,
						as: "creator",
						attributes: ["username", "avatar"],
					},
					{
						model: EventComment,
						as: "comments",
						include: {
							model: User,
							as: "poster",
							attributes: ["username", "avatar"],
						},
					},
					{ model: EventWatch, as: "watches" },
				],
			},
		],
	})
		.then((events) => {
			for (let i = 0; i < events.length; i++) {
				events[i] = events[i].get({ plain: true });
				events[i].event.numWatches = events[i].event.watches.length;
				// events[i].avatarURL = events[i].creator.avatar;
				events[i].event.creator = events[i].event.creator.username;
				//delete events[i].creator;
				delete events[i].watches;
			}
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json({ success: true, events: events });
		})
		.catch((err) => {
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

router.get("/created", auth.parseToken, async (req, res) => {
	await Event.findAll({
		where: {
			creatorId: req.decoded.id,
		},
		include: [
			{
				model: User,
				as: "creator",
				attributes: ["username", "avatar"],
			},
			{
				model: EventComment,
				as: "comments",
				include: {
					model: User,
					as: "poster",
					attributes: ["username", "avatar"],
				},
			},
			{ model: EventWatch, as: "watches" },
		],
	})
		.then((events) => {
			for (let i = 0; i < events.length; i++) {
				events[i] = events[i].get({ plain: true });
				events[i].numWatches = events[i].watches.length;
				// events[i].avatarURL = events[i].creator.avatar;
				events[i].creator = events[i].creator.username;
				//delete events[i].creator;
				delete events[i].watches;
			}
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json({ success: true, events: events });
		})
		.catch((err) => {
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

router.get("/watched", auth.parseToken, async (req, res) => {
	await EventWatch.findAll({
		where: {
			watcherId: req.decoded.id,
		},
		include: [
			{
				model: Event,
				as: "event",
				include: [
					{
						model: User,
						as: "creator",
						attributes: ["username", "avatar"],
					},
					{
						model: EventComment,
						as: "comments",
						include: {
							model: User,
							as: "poster",
							attributes: ["username", "avatar"],
						},
					},
					{ model: EventWatch, as: "watches" },
				],
			},
		],
	})
		.then((events) => {
			for (let i = 0; i < events.length; i++) {
				events[i] = events[i].get({ plain: true });
				events[i].event.numWatches = events[i].event.watches.length;
				// events[i].avatarURL = events[i].creator.avatar;
				events[i].event.creator = events[i].event.creator.username;
				//delete events[i].creator;
				delete events[i].watches;
			}
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json({ success: true, events: events });
		})
		.catch((err) => {
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

router.get("/created", auth.parseToken, async (req, res) => {
	await Event.findAll({
		where: {
			creatorId: req.decoded.id,
		},
		include: [
			{
				model: User,
				as: "creator",
				attributes: ["username", "avatar"],
			},
			{
				model: EventComment,
				as: "comments",
				include: {
					model: User,
					as: "poster",
					attributes: ["username", "avatar"],
				},
			},
			{ model: EventWatch, as: "watches" },
		],
	})
		.then((events) => {
			for (let i = 0; i < events.length; i++) {
				events[i] = events[i].get({ plain: true });
				events[i].numWatches = events[i].watches.length;
				// events[i].avatarURL = events[i].creator.avatar;
				events[i].creator = events[i].creator.username;
				//delete events[i].creator;
				delete events[i].watches;
			}
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json({ success: true, events: events });
		})
		.catch((err) => {
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

router
	.route("/watch/:eventId")
	.post(auth.parseToken, async (req, res) => {
		await EventWatch.findOrCreate({
			where: {
				eventId: req.params.eventId,
				watcherId: req.decoded.id,
			},
		})
			.then(([watch, created]) => {
				if (created) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: true,
						status: "Successfully watched event",
					});
				} else {
					res.statusCode = 400;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: false,
						status: "Already watched event",
					});
				}
			})
			.catch((err) => {
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
	.delete(auth.parseToken, async (req, res) => {
		await EventWatch.destroy({
			where: {
				eventId: req.params.eventId,
				watcherId: req.decoded.id,
			},
		})
			.then((rows) => {
				if (rows > 0) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: true,
						status: "Successfully unwatched event",
					});
				} else {
					res.statusCode = 403;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: false,
						error: "Unauthorized to unwatch the event",
					});
				}
			})
			.catch((err) => {
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

router.post("/comment/:eventId", auth.parseToken, async (req, res) => {
	await EventComment.create({
		eventId: req.params.eventId,
		posterId: req.decoded.id,
		content: req.body.content,
	})
		.then((comment) => {
			if (comment) {
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

router.get("/past", async (req, res) => {
	if (req.query.fetched) {
		let currentTime = new Date();
		await Event.findAll({
			where: {
				endTime: {
					[Op.lt]: currentTime,
				},
			},
			order: [["endTime", "DESC"]],
			offset: Number(req.query.fetched),
			limit: 10,
			include: [
				{
					model: User,
					as: "creator",
					attributes: ["username", "avatar"],
				},
				{
					model: EventComment,
					as: "comments",
					include: {
						model: User,
						as: "poster",
						attributes: ["username", "avatar"],
					},
				},
				{ model: EventWatch, as: "watches" },
			],
		})
			.then((events) => {
				for (let i = 0; i < events.length; i++) {
					events[i] = events[i].get({ plain: true });
					events[i].numWatches = events[i].watches.length;
					// events[i].avatarURL = events[i].creator.avatar;
					events[i].creator = events[i].creator.username;
					//delete events[i].creator;
					delete events[i].watches;
				}
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json({ success: true, events: events });
			})
			.catch((err) => {
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
	} else {
		res.statusCode = 400;
		res.setHeader("Content-Type", "application/json");
		res.json({ success: false, error: "Fetched number not supplied" });
	}
});

module.exports = router;
