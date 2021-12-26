FROM node:17.3.0

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD npm start
