FROM node:17.3.0

WORKDIR /opt/client

COPY package.json package-lock.json ./

RUN npm install

WORKDIR /opt/client/src

CMD ["npx", "next", "dev", "-p", "8082"]
