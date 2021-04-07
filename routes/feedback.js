const router = require("express").Router();
const Feedback = require("../models").Feedback;
const bodyParser = require("body-parser");
const auth = require('../auth');

router.use(bodyParser.json());

router.get('/', auth.parseToken, async (req, res) => {
    if (req.decoded.admin) {
        await Feedback.findAll()
        .then((feedbacks) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
                success: true,
                status: "Successfully get feedbacks",
                feedbacks: feedbacks,
            });
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
        res.sendStatus = 401;
        res.setHeader("Content-Type", "application/json");
        res.json({
            success: false,
            error: "Unauthorized to get feedbacks",
        });
    }
});

router.post('/', async (req, res) => {
    await Feedback.create({
        posterName: req.body.posterName,
        email: req.body.email,
        feedback: req.body.feedback
    })
    .then((feedback) => {
        if (feedback) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
                success: true,
                status: "Successfully created feedback",
                feedbackId: feedback.id,
            });
        } else {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.json({
                success: false,
                error: "feedback creation failed",
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

module.exports = router;