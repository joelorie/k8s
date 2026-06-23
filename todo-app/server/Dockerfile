FROM node:23-alpine

RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Africa/Nairobi /etc/localtime && \
    echo "Africa/Nairobi" > /etc/timezone && \
    apk del tzdata

WORKDIR /usr/src/app

COPY --chown=newuser:newuser *.json ./

RUN npm install && \
adduser -D newuser && \
chown -R newuser:newuser /usr/src/app

COPY --chown=newuser:newuser . .

EXPOSE 3000

USER newuser

CMD ["npm", "start"]