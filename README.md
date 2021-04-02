# BrownBytes

# Backend Server

## Environment Setup

Download [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) and install it. Record your database username and password.

Fill in the configuration in `./config/config.json`, the server will connect to the database you specified.

Run `npm install` to install dependencies. We use [sequelize-cli](https://sequelize.org/master/manual/migrations.html) to migrate database schemas to your local MySQL. Since there are already migrations in `migrations` folder, just run `npx sequelize-cli db:migrate` to commit them. For details, refer to [sequelize-cli](https://sequelize.org/master/manual/migrations.html).

Run `npm start` to start the server at `http://localhost:8080`.

# Client Server

## Environment Setup

First set up server environment following steps above.

Then, run `npm install` in directory 'app/client'.

To start dev mode, simply run  `npm run dev` in root directory (BrownBytes)
