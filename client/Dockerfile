FROM node:14-alpine
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
RUN npm run-script build

FROM nginx:1.19-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
