FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8082
ENTRYPOINT [ "node", "heroes.js" ]
CMD [ "8082" ]