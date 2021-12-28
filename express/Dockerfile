FROM node:17.3.0

WORKDIR /opt/express

COPY package.json package-lock.json ./

RUN npm install

WORKDIR /opt/express/src

CMD ["npx", "nodemon", "./server.js"]
