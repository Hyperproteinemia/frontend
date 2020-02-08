FROM nginx:alpine

COPY dist/devops-fun         /usr/share/nginx/html
COPY nginx.conf              /etc/nginx/nginx.conf
