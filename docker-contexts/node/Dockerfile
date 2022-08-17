FROM ubuntu:22.04

RUN apt-get update && apt-get install --yes curl && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/*
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install --yes nodejs

RUN apt-get update && apt-get install --yes build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/*

WORKDIR /opt/app

# COPY package.json package-lock.json ./
# this is now mounted in to enable updating (via npm install command) from bash within the containers

# RUN npm install
# this is now handled at runtime by installing into a shared volume

CMD exec python3 -u /opt/app/misc/node-run
