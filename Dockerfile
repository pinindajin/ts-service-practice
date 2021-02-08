FROM node:14.15.4-alpine3.11

# create work directory and make sure the node user owns it
RUN mkdir -p /home/node/ts-service-practice/node_modules && chown -R node:node /home/node/ts-service-practice
WORKDIR /home/node/ts-service-practice

# install dependencies as node user
USER node
COPY --chown=node:node . .
RUN npm install

# compile our javascript
RUN npm run compile

# expose and run application
CMD [ "node", "./build/src/app.js" ]