FROM node:17.3.0

WORKDIR /opt/server

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 8000

WORKDIR /opt/server/src

CMD ["npx", "nodemon", "./server.js"]
