const router = require('express').Router();
const Event = require('../models').Event;
const EventWatch = require('../models').EventWatch;
const EventComment = require('../models').EventComment;
const bodyParser = require('body-parser');
const auth = require('../auth');

router.use(bodyParser.json());

router.route('/')
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
        otherInfo: req.body.otherInfo
    })
    .then((event) => {
        if (event) {
            console.log(event.id);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: "Successfully created event", eventId: event.id});
        } else {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, error: "Event creation failed"});
        }
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        if (err.hasOwnProperty('errors')) {
            res.json({error: err.errors[0].message});
        } else if (err.hasOwnProperty('original') && err.original.hasOwnProperty('sqlMessage')) {
            res.json({error: err.original.sqlMessage});
        } else {
            res.json({error: ''});
        }
    });
});

router.delete('/:eventId', auth.parseToken, async (req, res) => {
    await Event.destroy({
        where: {
            id: req.params.eventId,
            creatorId: req.decoded.id
        }
    })
    .then((rows) => {
        if (rows > 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: "Successfully deleted event"});
        } else {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, error: "Unauthorized to delete the event"});
        }
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        if (err.hasOwnProperty('errors')) {
            res.json({error: err.errors[0].message});
        } else if (err.hasOwnProperty('original') && err.original.hasOwnProperty('sqlMessage')) {
            res.json({error: err.original.sqlMessage});
        } else {
            res.json({error: ''});
        }
    });
});

router.route('/watch/:eventId')
.post(auth.parseToken, async (req, res) => {
    await EventWatch.findOrCreate({
        where: {
            eventId: req.params.eventId,
            watcherId: req.decoded.id
        }
    })
    .then(([watch, created]) => {
        console.log(created);
        if (created) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: "Successfully watched event"});
        } else {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, status: "Already watched event"});
        }
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        if (err.hasOwnProperty('errors')) {
            res.json({error: err.errors[0].message});
        } else if (err.hasOwnProperty('original') && err.original.hasOwnProperty('sqlMessage')) {
            res.json({error: err.original.sqlMessage});
        } else {
            res.json({error: ''});
        }
    });
})
.delete(auth.parseToken, async (req, res) => {
    await EventWatch.destroy({
        where: {
            eventId: req.params.eventId,
            watcherId: req.decoded.id
        }
    })
    .then((rows) => {
        if (rows > 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: "Successfully unwatched event"});
        } else {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, error: "Unauthorized to unwatch the event"});
        }
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        if (err.hasOwnProperty('errors')) {
            res.json({error: err.errors[0].message});
        } else if (err.hasOwnProperty('original') && err.original.hasOwnProperty('sqlMessage')) {
            res.json({error: err.original.sqlMessage});
        } else {
            res.json({error: ''});
        }
    });
});

router.post('/comment/:eventId', auth.parseToken, async (req, res) => {
    await EventComment.create({
        eventId: req.params.eventId,
        posterId: req.decoded.id,
        content: req.body.content
    })
    .then((comment) => {
        if (comment) {
            console.log(comment.id);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: "Successfully posted comment", commentTime: comment.createdAt});
        } else {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, error: "Comment creation failed"});
        }
    })
    .catch((err) => {
        console.log(err);
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        if (err.hasOwnProperty('errors')) {
            res.json({error: err.errors[0].message});
        } else if (err.hasOwnProperty('original') && err.original.hasOwnProperty('sqlMessage')) {
            res.json({error: err.original.sqlMessage});
        } else {
            res.json({error: ''});
        }
    });
});

module.exports = router;