#state 1

FROM node:14.19.0-alpine as node
WORKDIR /app
COPY . .

# Add nginx config
# COPY ./docker/nginx/nginx.conf /temp/nginx.conf
# RUN envsubst /app < /temp/nginx.conf > /etc/nginx/conf.d/default.conf

RUN npm install
RUN npm run build --prod


#state 2
