FROM node:17.3.0

WORKDIR /opt/server

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 8000

CMD ["npx", "nodemon", "./src/server.js"]
