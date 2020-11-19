FROM node:12.19

# Create app directory
WORKDIR /usr/src/app


# Install app and dependencies
COPY . /usr/src/app
RUN npm install

# Bundle app source


EXPOSE 3000
CMD [ "npm", "start"]
