const router = require("express").Router();
const User = require("../models").User;
const Post = require("../models").Post;
const PostComment = require("../models").PostComment;
const bodyParser = require("body-parser");
const auth = require("../auth");
const { Op } = require("sequelize");

router.use(bodyParser.json());

router.get("/created", auth.parseToken, async (req, res) => {
	await Post.findAll({
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
				model: PostComment,
				as: "comments",
				include: {
					model: User,
					as: "poster",
					attributes: ["username", "avatar"],
				},
			},
		],
	})
		.then((posts) => {
			for (let i = 0; i < posts.length; i++) {
				posts[i] = posts[i].get({ plain: true });
				posts[i].avatarURL = posts[i].isAnonymous
					? `${req.protocol}://${req.get(
							"host"
					  )}/images/default_avatar.png`
					: posts[i].creator.avatar;
				posts[i].creator = posts[i].isAnonymous
					? "Anonymous"
					: posts[i].creator.username;
			}
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json({ success: true, posts: posts });
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
	.route("/")
	.get(async (req, res) => {
		if (req.query.fetched) {
			await Post.findAll({
				order: [["createdAt", "DESC"]],
				offset: Number(req.query.fetched),
				limit: 10,
				include: [
					{
						model: User,
						as: "creator",
						attributes: ["username", "avatar"],
					},
					{
						model: PostComment,
						as: "comments",
						include: {
							model: User,
							as: "poster",
							attributes: ["username", "avatar"],
						},
					},
				],
			})
				.then((posts) => {
					for (let i = 0; i < posts.length; i++) {
						posts[i] = posts[i].get({ plain: true });
						posts[i].avatarURL = posts[i].creator.avatar;
						posts[i].creator = posts[i].creator.username;
					}
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({ success: true, posts: posts });
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
		} else if (req.query.queryString) {
			await Post.findAll({
				where: {
					[Op.or]: [
						{
							content: {
								[Op.substring]: req.query.queryString,
							},
						},
						{
							"$creator.username$": {
								[Op.substring]: req.query.queryString,
							},
						},
					],
				},
				include: [
					{
						model: User,
						as: "creator",
						attributes: ["username", "avatar"],
					},
					{
						model: PostComment,
						as: "comments",
						include: {
							model: User,
							as: "poster",
							attributes: ["username", "avatar"],
						},
					},
				],
			})
				.then((posts) => {
					for (let i = 0; i < posts.length; i++) {
						posts[i] = posts[i].get({ plain: true });
						posts[i].creator = posts[i].creator.username;
					}
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({ success: true, posts: posts });
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
			res.json({ success: false, error: "Query parameter not supplied" });
		}
	})
	.post(auth.parseToken, async (req, res) => {
		await Post.create({
			creatorId: req.decoded.id,
			//isAnonymous: req.body.anonymous,
			isAnonymous: false,
			content: req.body.content,
		})
			.then((post) => {
				if (post) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: true,
						status: "Successfully created post",
						postId: post.id,
					});
				} else {
					res.statusCode = 400;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: false,
						error: "post creation failed",
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

router.delete("/:postId", auth.parseToken, async (req, res) => {
	if (req.decoded.admin) {
		await Post.destroy({
			where: {
				id: req.params.postId,
			},
		})
			.then((rows) => {
				if (rows > 0) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: true,
						status: "Successfully deleted post",
					});
				} else {
					res.statusCode = 403;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: false,
						error: "Unauthorized to delete the post",
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
		await Post.destroy({
			where: {
				id: req.params.postId,
				creatorId: req.decoded.id,
			},
		})
			.then((rows) => {
				if (rows > 0) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: true,
						status: "Successfully deleted post",
					});
				} else {
					res.statusCode = 403;
					res.setHeader("Content-Type", "application/json");
					res.json({
						success: false,
						error: "Unauthorized to delete the post",
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

router.post("/comment/:postId", auth.parseToken, async (req, res) => {
	await PostComment.create({
		postId: req.params.postId,
		posterId: req.decoded.id,
		content: req.body.content,
	})
		.then((comment) => {
			if (comment) {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json({
					success: true,
					status: "Successfully posted a comment",
					comment: comment,
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

module.exports = router;
