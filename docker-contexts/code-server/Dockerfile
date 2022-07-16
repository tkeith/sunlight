FROM node:18.4.0

WORKDIR /opt/app

RUN curl -fsSL https://code-server.dev/install.sh | sh

CMD code-server --bind-addr 0.0.0.0:8080 --auth none --cert false /opt/app
