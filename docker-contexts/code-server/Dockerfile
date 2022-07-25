FROM node:18.4.0

WORKDIR /opt/app

RUN curl -fsSL https://code-server.dev/install.sh | sh

CMD ( test -e scratch_volume/package.json || echo '{"type": "module"}' > scratch_volume/package.json ) && code-server --bind-addr 0.0.0.0:8080 --auth none --cert false /opt/app
