#Sample Dockerfile for NodeJS Apps

FROM node:18

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . /app

EXPOSE 8080

CMD [ "node", "server.js" ]
