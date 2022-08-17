FROM ubuntu:22.04

RUN apt-get update && apt-get install --yes curl && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/*
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install --yes nodejs

RUN apt-get update && apt-get install --yes build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/*

WORKDIR /opt/app

RUN apt-get update && apt-get install python3 python3-pip --yes && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/* && pip3 install jupyterlab==3.4.3
