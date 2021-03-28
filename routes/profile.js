const router = require('express').Router();
const multer = require('multer');
const User = require('../models').User;
const bodyParser = require('body-parser');
const auth = require('../auth');

router.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

router.route('/')
.get(auth.parseToken, async (req, res) => {
    console.log(req.decoded);
    await User.findOne({ where: {
        id: req.decoded.id
    }})
    .then((user) => {
        if (user) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, data: {
                avatar: user.avatar,
                bio: user.bio,
                facebook: user.facebookLink,
                twitter: user.twitterLink,
                instagram: user.instagramLink
            }});
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, error: 'User not found'});
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
.patch(auth.parseToken, async (req, res) => {
    console.log(req.decoded);
    await User.update({
        bio: req.body.bio,
        facebookLink: req.body.facebook,
        twitterLink: req.body.twitter,
        instagramLink: req.body.instagram
    }, { 
        where: {
            id: req.decoded.id
        }
    });
    await User.findOne({ where: {
        id: req.decoded.id
    }})
    .then((user) => {
        if (user) {
            // console.log(user);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, data: {
                avatar: user.avatar,
                bio: user.bio,
                facebook: user.facebookLink,
                twitter: user.twitterLink,
                instagram: user.instagramLink
            }});
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, error: 'User not found'});
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

router.get('/:userId', auth.parseToken, async (req, res) => {
    await User.findOne({
        where: {
            id: req.params.userId
        }
    })
    .then((user) => {
        if (user) {
            // console.log(user);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, data: {
                avatar: user.avatar,
                bio: user.bio,
                facebook: user.facebookLink,
                twitter: user.twitterLink,
                instagram: user.instagramLink
            }});
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, error: 'User not found'});
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

router.post('/avatar', auth.parseToken, upload.single('imageFile'), async (req, res) => {
    const avatarUrl = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
    await User.update({
        avatar: avatarUrl
    }, {
        where: {
            id: req.decoded.id
        }
    });
    await User.findOne({ where: {
        id: req.decoded.id
    }})
    .then((user) => {
        if (user) {
            if (user.avatar === avatarUrl) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, avatar: user.avatar});
            } else {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: false, error: "Upload failed"});
            }
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, error: 'User not found'});
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