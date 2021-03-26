const express = require("express");
const path = require("path");
const usersRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "public")));

app.use("/user", usersRouter);
app.use("/profile", profileRouter);

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
