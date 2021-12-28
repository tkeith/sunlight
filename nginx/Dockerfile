FROM nginx:1.21.4

RUN apt-get update \
  && apt-get install -y apache2-utils \
  && rm -rf /var/lib/apt/lists/*

COPY ./nginx_app.conf /etc/nginx/conf.d/nginx_app.conf

COPY ./nginx_admin_password.txt /opt/nginx_admin_password.txt

RUN htpasswd -b -c /opt/htpasswd-admin admin "$(cat /opt/nginx_admin_password.txt)"
