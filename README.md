<p align="center"><img src="/client/public/brownbytes-logo.png" align="center" width="333" height="159" align="center" /></p>

**A website for sharing free food events information, donating spare meal plan swipes, and networking with people inside or outside Brown community. This website borrowed much inspiration from [Scott Huson's work](https://github.com/brown-bytes/brown-bytes)**

## Visit BrownBytes [HERE](http://brownbytes.club/).

## Tech Stack

Frontend: [React](https://reactjs.org/), [Redux](https://redux.js.org/), [React Bootstrap](https://react-bootstrap.netlify.app/), [Moment](https://momentjs.com/),
[axios](https://www.npmjs.com/package/axios).

Backend: [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/).

Database: [MySQL](https://www.mysql.com/), [Sequelize](https://sequelize.org/).

Deployment: [Docker](https://www.docker.com/), [Nginx](https://www.nginx.com/).

## Instructions for Running the Code with Docker

### Step 1: Install Docker on local machine or on a server

Visit this [page](https://docs.docker.com/get-docker/) to get docker.

### Step 2: Edit configs

Find your computer's IP address (not "localhost", may get by running `ifconfig` command in terminal) in your local network. In the following files, replace the IP address parts (excluding ports) with your IP:
- [proxy.js](./client/src/utils/proxy.js)
- Avatar URL in [seeder](./server/seeders/20210405133707-super-user.js)
- Host in [config.json](./server/config/config.json)

### Step 3: Build and run Docker containers

Under root directory `BrownBytes`, run command:
```
docker-compose up -d --build
```

Three containers: MySQL, server, and client will then be built and run locally. After this step, BrownBytes can be visited at http://localhost:3000. This completes setting up BrownBytes with Docker.

Note: Current backend [Dockerfile](./server/Dockerfile) cleans database each time it builds. You may disable this by removing `RUN ./reconstructTables.sh`.

## Instructions for Running the Code in Development Mode

Alternatively, if the Docker method does not work, client and server can be run in development mode.

### Step 1. Install MySQL

Download [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) and install it. Take a note of your database name, username (root by default), and password. Or pull a [MySQL Docker image](https://hub.docker.com/_/mysql/).

### Step 2. Edit Configs

Replace the IP address parts with `127.0.0.1` in the following files.
- [proxy.js](./client/src/utils/proxy.js)
- Avatar URL in [seeder](./server/seeders/20210405133707-super-user.js)
- Host in [config.json](./server/config/config.json)

In file [config.json](./server/config/config.json), also replace "username", "password" and "database" with your username, password and database name. And then change "port" from `3305` to `3306`.

### Step 3. Install dependencies

Run command
```
npm install
```
under `server` and `client` directories to install dependencies.

### Step 4. Set up DB Schema

In the `server` directory, run [reconstructTable.sh](./server/reconstructTables.sh) to create and initialize tables in the database.

### Step 5. Start client server and back end server


Under `server` directory, run command <code>npm run-script server</code> to start the back end server,


Under `client` directory, run command <code>npm start</code> to start the client server,


And then the website is accessible at http://localhost:3000.
