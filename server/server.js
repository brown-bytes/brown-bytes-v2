const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const execSync = require('child_process').execSync;
const usersRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const eventsRouter = require("./routes/event");
const offersRouter = require("./routes/offer");
const postsRouter = require("./routes/post");
const feedbacksRouter = require("./routes/feedback");
const app = express();
const port = 8080;
const host = "127.0.0.1";

const output = execSync('./reconstructTables.sh', { encoding: 'utf-8' });
console.log('Output was:\n', output);
app.use(cors());
app.use(morgan("common"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/profile", profileRouter);
app.use("/events", eventsRouter);
app.use("/offers", offersRouter);
app.use("/posts", postsRouter);
app.use("/feedbacks", feedbacksRouter);

app.listen(port, host, () => console.log(`Server is listening on port: ${port}`));
