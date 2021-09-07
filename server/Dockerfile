FROM node:14-alpine
ENV TZ='America/New_York'
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 8080
<<<<<<< HEAD
#RUN ./reconstructTables.sh
CMD npm run-script server
=======
# RUN ./reconstructTables.sh
CMD npm run-script server
>>>>>>> cd755087038aa962dde6973dc6a2a3e5a603ee74
