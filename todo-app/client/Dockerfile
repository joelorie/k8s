FROM node:23-alpine AS builder

WORKDIR /usr/src/app

COPY *.json ./

RUN npm install 

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]