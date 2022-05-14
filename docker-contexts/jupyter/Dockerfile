FROM node:17.3.0

WORKDIR /opt/app

RUN apt-get update && apt-get install jupyter-notebook --yes && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/*
