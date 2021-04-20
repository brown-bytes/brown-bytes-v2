<p align="center"><img src="/client/public/brownbytes-logo.png" align="center" width="333" height="159" align="center" /></p>

**A website for sharing free food events information, donating spare meal plan swipes, and networking with people inside or outside Brown community.**

## Visit the page [HERE](http://brownbytes.club/).

## Tech Stack

Frontend: [React](https://reactjs.org/), [Redux](https://redux.js.org/), [React Bootstrap](https://react-bootstrap.netlify.app/), [Moment](https://momentjs.com/),
[axios](https://www.npmjs.com/package/axios).

Backend: [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/).

Database: [MySQL](https://www.mysql.com/), [Sequelize](https://sequelize.org/).

Deployment: [Docker](https://www.docker.com/), [Nginx](https://www.nginx.com/).

## Instructions for Running the Code

### Step 1: Install Docker on local machine or on a server

Visit this [page](https://docs.docker.com/get-docker/) to get docker.

### Step 2: Build and run the client image

Under the [client](https://github.com/player-eric/BrownBytes/tree/main/client) directory, run command <code>docker build -t brownbytes-client .</code> to build the client image.

Upon successfully building the client image, a react app and an Nginx reverse proxy will be created and ready to launch by running <code>docker run -p 5000:80 brownbytes-client</code>. And then the website can be accessed at [http://localhost:5000/](http://localhost:5000/).

At this point, the frontend is connected to the same database as [http://brownbytes.club/](http://brownbytes.club/) running on its server. To set up and connect to the back end server and database locally, please proceed to step 3, 4.

### Step 3: Install MySQL Community Server

Download [MySQL Community Server](https://dev.mysql.com/downloads/mysql/). Make sure to take a note of the database name, username, and password.

### Step 4: Build and run the server image

Change the database name, username and password in file [server/config/config.json](https://github.com/player-eric/BrownBytes/blob/deploy/server/config/config.json) to your database name, username, and password. Change all the host entries to "127.0.0.1".

Change the proxy in file [client/src/utils/proxy.js](https://github.com/player-eric/BrownBytes/blob/deploy/client/src/utils/proxy.js) to http://localhost:8080/.

Rebuild the client image. Then build the server image by running <code>docker build -t brownbytes-client .</code> under the server directory.

Launch the server by running <code>docker run -p 8080:8080 brownbytes-client</code>.

## Individual contributions

| Name  | Contributions |
| ------------- | ------------- |
| Qiaonan Huang  | AAA  |
| Wei Li  | BBB  |
| Shiqin Yan | Designed database schema and RESTful APIs for all functionalities; <br /> Designed and implemented all the frontend pages;  |
| Zhe Shen | DDD |
