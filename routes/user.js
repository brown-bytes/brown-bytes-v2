const router = require("express").Router();
const User = require("../models").User;
const bodyParser = require("body-parser");
const auth = require("../auth");

router.use(bodyParser.json());

router.post("/signup", async (req, res) => {
	console.log(req.body);
	if (req.body.email && req.body.password && req.body.userName) {
		const hash = auth.hashPassword(req.body.password);
		const avatarUrl =
			req.protocol +
			"://" +
			req.get("host") +
			"/images/default_avatar.png";
		await User.create({
			email: req.body.email,
			password: hash,
			userName: req.body.userName,
			avatar: avatarUrl,
		})
			.then((user) => {
				if (user) {
					console.log(user.id);
					let token = auth.getToken({ id: user.id });
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({ message: "Registration success", token: token });
				} else {
					res.statusCode = 400;
					res.setHeader("Content-Type", "application/json");
					res.json({ error: "Sign up failed" });
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
	} else {
		res.statusCode = 400;
		res.setHeader("Content-Type", "application/json");
		res.json({ error: "Not all fields are specified" });
	}
});

router.post("/login", async (req, res) => {
	console.log(req.body);
	if (req.body.email && req.body.password) {
		await User.findOne({
			where: {
				email: req.body.email,
			},
		})
			.then((user) => {
				if (user) {
					if (
						!auth.verifyPassword(req.body.password, user.password)
					) {
						res.statusCode = 401;
						res.setHeader("Content-Type", "application/json");
						res.json({
							success: false,
							error: "Incorrect password",
						});
					} else {
						let token = auth.getToken({ id: user.id });
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						res.json({
							success: true,
							status: "Login Successful!",
							token: token,
						});
					}
				} else {
					res.statusCode = 400;
					res.setHeader("Content-Type", "application/json");
					res.json({ success: false, error: "Account not found" });
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
	} else {
		res.statusCode = 400;
		res.setHeader("Content-Type", "application/json");
		res.json({ success: false, error: "Missing email or password" });
	}
});

module.exports = router;
