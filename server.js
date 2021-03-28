const express = require('express');
const path = require('path');
const usersRouter = require('./routes/user');
const profileRouter = require('./routes/profile');
const eventsRouter = require('./routes/event');
const offersRouter = require('./routes/offer');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/events', eventsRouter);
app.use('/offers', offersRouter);

app.listen(port, () => console.log(`Server is listening on port: ${port}`));