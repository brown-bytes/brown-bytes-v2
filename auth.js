const jwt = require("jsonwebtoken");
const config = require("./config.js");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models").User;
const bcrypt = require("bcrypt");

let getToken = function (user) {
	return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
	new JwtStrategy(opts, (jwt_payload, done) => {
		const user = User.findOne({ where: { id: jwt_payload.id } });
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	})
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

let parseToken = (req, res, next) => {
	let token = req.headers["x-auth-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
	if (token.startsWith("Bearer ")) {
		// Remove Bearer from string
		token = token.slice(7, token.length);
	}

	if (token) {
		jwt.verify(token, config.secretKey, (err, decoded) => {
			if (err) {
				res.statusCode = 400;
				return res.json({
					success: false,
					message: "Token is not valid",
				});
			} else {
				const user = User.findOne({ where: { id: decoded.id } });
				if (user) {
					req.decoded = decoded;
					next();
				} else {
					res.statusCode = 400;
					return res.json({
						success: false,
						message: "Token is not valid",
					});
				}
			}
		});
	} else {
		res.statusCode = 400;
		return res.json({
			success: false,
			message: "Auth token is not supplied",
		});
	}
};

let hashPassword = (password) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

let verifyPassword = (passAttempt, hash) => {
	return bcrypt.compareSync(passAttempt, hash);
};

module.exports = {
	getToken: getToken,
	parseToken: parseToken,
	hashPassword: hashPassword,
	verifyPassword: verifyPassword,
};
