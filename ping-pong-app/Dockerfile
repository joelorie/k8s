FROM node:23-alpine

WORKDIR /usr/src/app

COPY --chown=newuser:newuser *.json ./

RUN npm install && \
adduser -D newuser && \
chown -R newuser:newuser /usr/src/app

COPY --chown=newuser:newuser . .

USER newuser

EXPOSE 3000

CMD ["npm", "start"]
