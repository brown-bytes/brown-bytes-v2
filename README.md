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

### Step 2: Edit config

Find your computer's IP address (not localhost) in your connected network. Change IP address part (exclude port) to your IP in following files:
- [proxy.js](./client/src/utils/proxy.js)
- Avatar URL in [seeder](./server/seeders/20210405133707-super-user.js)
- Host in [config.json](./server/config/config.json)

### Step 3: Build and Run

Run
```
docker-compose up -d --build
```

Three containers: MySQL, server, client will start. After successful build, visit website at http://localhost:3000. This completes setting up brown bytes in local environment.

Note: Current backend [Dockerfile](./server/Dockerfile) cleans database each time it builds. You may disable this by removing `RUN ./reconstructTables.sh`.

## Individual contributions

| Name  | Contributions |
| ------------- | ------------- |
| Qiaonan Huang  | Designed and implement email verification process; <br /> Implement parts of database schemas and do some backend tests; |
| Wei Li  | Designed and implement Facebook login and Google Login; <br /> Do all the frontend tests; <br /> Do the Black-box testing; |
| Shiqin Yan | Designed database schema and RESTful APIs for all functionalities; <br /> Designed and implemented all the frontend pages;  |
| Zhe Shen | Implemented database schemas, migrated schema to MySQL; <br /> Implemented most backend RESTful API, tested with Postman; <br /> Deployed application on AWS with Docker.|
