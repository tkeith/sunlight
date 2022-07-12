FROM node:18.4.0

WORKDIR /opt/test

RUN printf "deb http://deb.debian.org/debian unstable main\ndeb http://deb.debian.org/debian experimental main" > /etc/apt/sources.list.d/extras.list

RUN apt update && apt upgrade --yes && apt install xvfb --yes && apt -t experimental install chromium --yes
