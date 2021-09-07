FROM node:14-alpine
ENV TZ='America/New_York'
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 8080
#RUN ./reconstructTables.sh
CMD npm run-script server
