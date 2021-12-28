FROM nginx:1.21.4

RUN apt-get update \
  && apt-get install -y apache2-utils \
  && rm -rf /var/lib/apt/lists/*

COPY ./nginx-app.conf /etc/nginx/conf.d/nginx-app.conf

COPY ./nginx-admin-password.txt /opt/nginx-admin-password.txt

RUN htpasswd -b -c /opt/htpasswd-admin admin "$(cat /opt/nginx-admin-password.txt)"
