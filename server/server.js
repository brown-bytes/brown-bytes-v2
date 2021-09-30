const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const execSync = require('child_process').execSync;
const https = require('https');
const fs = require('fs');
const usersRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const eventsRouter = require("./routes/event");
const offersRouter = require("./routes/offer");
const postsRouter = require("./routes/post");
const feedbacksRouter = require("./routes/feedback");
const winston = require('winston')
const app = express();
const port = 3000;
const host = "127.0.0.1";

// Make sure the DB is initialized
const output = execSync('./reconstructTables.sh', { encoding: 'utf-8' });
console.log('Output was:\n', output);

// Set up CORS
const corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/brownbytes.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/brownbytes.org/fullchain.pem'),
}, app);


// Set up logger
const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
    transports: [consoleTransport]
};
const logger = new winston.createLogger(myWinstonOptions);

function logRequest(req, res, next) {
  logger.info(req.url);
  next();
}
app.use(logRequest);


app.use(morgan("common"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/profile", profileRouter);
app.use("/events", eventsRouter);
app.use("/offers", offersRouter);
app.use("/posts", postsRouter);
app.use("/feedbacks", feedbacksRouter);

app.listen(port, host, () => console.log(`Server is listening on port: ${port}`));
