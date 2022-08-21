FROM ubuntu:22.04

RUN apt-get update && apt-get install --yes curl && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/*
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install --yes nodejs

RUN apt-get update && apt-get install --yes build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/*

RUN apt-get update && apt-get install dumb-init && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/*
RUN curl -fsSL https://code-server.dev/install.sh | sh
RUN code-server --install-extension juanblanco.solidity
RUN code-server --install-extension bradlc.vscode-tailwindcss
RUN code-server --install-extension dsznajder.es7-react-js-snippets
RUN code-server --install-extension ms-python.python
RUN code-server --install-extension Prisma.prisma

WORKDIR /opt/app
