const express = require('express');
const usersRouter = require('./routes/user');
const app = express();
const port = 8080;

app.use('/users', usersRouter);
app.listen(port, () => console.log(`Server is listening on port: ${port}`));