const router = require("express").Router();
const User = require("../models").User;
const bodyParser = require("body-parser");
const auth = require("../auth");

router.use(bodyParser.json());

router.post("/signup", (req, res, next) => {
	console.log(req.body);
	(async () => {
		if (req.body.email && req.body.password && req.body.userName) {
			const hash = auth.hashPassword(req.body.password);
			const avatarUrl =
				req.protocol +
				"://" +
				req.get("host") +
				"/public/images/default_avatar.png";
			const user = await User.create({
				email: req.body.email,
				password: hash,
				userName: req.body.userName,
				avatar: avatarUrl,
			});
			if (user) {
				console.log(user.id);
				let token = auth.getToken({ id: user.id });
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json({ token: token });
			} else {
				res.statusCode = 400;
				res.setHeader("Content-Type", "application/json");
				res.json({ error: "Sign up failed" });
				//Please return more specific error like "An account already exists with this e-mail address"
			}
		} else {
			res.statusCode = 400;
			res.setHeader("Content-Type", "application/json");
			res.json({ error: "Not all fields are specified" });
		}
	})().catch((err) => {
		console.log(err);
		res.statusCode = 400;
		res.setHeader("Content-Type", "application/json");
		res.json({ error: "Sign up failed" });
	});
});

router.post("/login", async (req, res) => {
	console.log(req.body);
	if (req.body.email && req.body.password) {
		const user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (user) {
			if (!auth.verifyPassword(req.body.password, user.password)) {
				res.statusCode = 401;
				res.setHeader("Content-Type", "application/json");
				res.json({ success: false, status: "Incorrect password" });
			}
			let token = auth.getToken({ id: user.id });
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json({
				success: true,
				status: "Login Successful!",
				token: token,
			});
		} else {
			res.statusCode = 400;
			res.setHeader("Content-Type", "application/json");
			res.json({ success: false, status: "Account not found" });
		}
	} else {
		res.statusCode = 400;
		res.setHeader("Content-Type", "application/json");
		res.json({ success: false, status: "Missing email or password" });
	}
});

module.exports = router;
