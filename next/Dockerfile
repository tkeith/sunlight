FROM node:17.3.0

WORKDIR /opt/next

COPY package.json package-lock.json ./

RUN npm install

WORKDIR /opt/next/src

CMD ["npx", "next", "dev", "-p", "8001"]
