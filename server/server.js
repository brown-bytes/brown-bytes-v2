const express = require("express");
const path = require("path");
const cors = require("cors");
const usersRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const eventsRouter = require("./routes/event");
const offersRouter = require("./routes/offer");
const postsRouter = require("./routes/post");
const feedbacksRouter = require("./routes/feedback");
const app = express();
const port = 8080;
const host = "0.0.0.0";

app.use(cors({origin: "http://ec2-3-138-68-52.us-east-2.compute.amazonaws.com/"}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/profile", profileRouter);
app.use("/events", eventsRouter);
app.use("/offers", offersRouter);
app.use("/posts", postsRouter);
app.use("/feedbacks", feedbacksRouter);

app.listen(port, host, () => console.log(`Server is listening on port: ${port}`));
