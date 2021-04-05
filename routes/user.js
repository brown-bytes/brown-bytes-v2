const router = require("express").Router();
const User = require("../models").User;
const emailVerifyDb = require("../models").EmailVerification;
const bodyParser = require("body-parser");
const auth = require("../auth");
const nodemailer = require("nodemailer");

router.use(bodyParser.json());

router.post("/signup", async (req, res) => {
	if (req.body.email && req.body.password && req.body.userName) {
        if (req.body.password.length < 8) {
            res.statusCode = 400;
			res.setHeader("Content-Type", "application/json");
			res.json({ error: "Password should be at least 8 characters" });
            return;
        }
		const hash = auth.hashPassword(req.body.password);
		const avatarUrl = `${req.protocol}://${req.get(
			"host"
		)}/images/default_avatar.png`;
		await User.create({
			email: req.body.email,
			password: hash,
			userName: req.body.userName,
			avatar: req.body.avatarUrl ? req.body.avatarUrl : avatarUrl,
		})
			.then((user) => {
				if (user) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({ message: "Registration success" });
					sendEmail(req);
				} else {
					res.statusCode = 400;
					res.setHeader("Content-Type", "application/json");
					res.json({ error: "Sign up failed" });
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
		res.statusCode = 400;
		res.setHeader("Content-Type", "application/json");
		res.json({ error: "Not all fields are specified" });
	}
});

router.post("/signupsocial", async (req, res) => {
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
			avatar: req.body.avatarUrl ? req.body.avatarUrl : avatarUrl,
			isActive: true,
		})
			.then((user) => {
				if (user) {
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
						if (!user.isActive) {
							sendEmail(req);
							res.statusCode = 401;
							res.setHeader("Content-Type", "application/json");
							res.json({
								success: false,
								error: "Please verify your email first.",
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
					}
				} else {
					res.statusCode = 400;
					res.setHeader("Content-Type", "application/json");
					res.json({ success: false, error: "Account not found" });
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
		res.statusCode = 400;
		res.setHeader("Content-Type", "application/json");
		res.json({ success: false, error: "Missing email or password" });
	}
});

router.get("/verify", async (req, res) => {
	const { email, key } = req.query;
	let db_key;
	await emailVerifyDb.findOne({ where: { email } }).then((obj) => {
		if (obj) {
			db_key = obj.key;
		}
	});
	if (key == db_key) {
		res.end(
			`<h1>Email is Successfully verified</h1>
			<h2>Click <a href="http://www.google.com">here</a> to log in to BrownBytes</h2>`
		);
		await User.update({ isActive: true }, { where: { email } });
	} else {
		res.end("<h1>Email cannot be verified by this link</h1>");
	}
});

// Email verification helper functions
const randomFns = () => {
	let code = "";
	for (let i = 0; i < 10; i++) {
		code += parseInt(Math.random() * 10);
	}
	return code;
};
async function sendEmail(req) {
	let e_mail = req.body.email;
	let host = req.get("host") + req.baseUrl;

	let smtpTransport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "brownbytetest",
			pass: "brownbytetestpassword",
		},
	});

	const rand = randomFns();
	const link = `http://${host}/verify?email=${e_mail}&key=${rand}`;
	const mailOptions = {
		to: e_mail,
		subject: "Please confirm your Email account",
		html: `Hello,<br> 
        Please Click on the link to verify your email.<br>
        <a href="${link}">Click here to verify</a> <br>
        This will expire in 5 mins.`,
	};

	smtpTransport.sendMail(mailOptions, async (error, response) => {
		if (error) {
			res.end("error");
		} else {
			await emailVerifyDb.destroy({ where: { email: e_mail } });
			await emailVerifyDb.create({
				email: e_mail,
				key: rand,
			});
			setTimeout(async () => {
				await emailVerifyDb.destroy({ where: { email: e_mail } });
			}, 1000 * 60 * 5);
		}
	});
}
module.exports = router;
