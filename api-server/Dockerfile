FROM node:12.19

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install supervisor -g

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "supervisor", "server.js" ]