FROM node:18.4.0

WORKDIR /opt/app

# COPY package.json package-lock.json ./
# this is now mounted in to enable updating (via npm install command) from bash within the containers

# RUN npm install
# this is now handled at runtime by installing into a shared volume

CMD python3 -u /opt/app/misc/node-run
