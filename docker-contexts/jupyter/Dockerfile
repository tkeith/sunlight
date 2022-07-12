FROM node:18.4.0

WORKDIR /opt/app

# RUN apt-get update && apt-get install jupyter-notebook --yes && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/*

RUN apt-get update && apt-get install python3 python3-pip --yes && apt-get clean && rm -rf /tmp/* /var/tmp/* /var/lib/apt/archive/* /var/lib/apt/lists/* && pip3 install jupyterlab==3.4.3
