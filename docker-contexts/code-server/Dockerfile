FROM node:18.4.0

WORKDIR /opt/app

RUN apt-get update && apt-get install dumb-init && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/*
RUN curl -fsSL https://code-server.dev/install.sh | sh
RUN code-server --install-extension juanblanco.solidity
RUN code-server --install-extension bradlc.vscode-tailwindcss
RUN code-server --install-extension dsznajder.es7-react-js-snippets
RUN code-server --install-extension ms-python.python

CMD ( test -e scratch_volume/package.json || echo '{"type": "module"}' > scratch_volume/package.json ) && exec dumb-init code-server --bind-addr 0.0.0.0:8080 --auth none --cert false /opt/app
