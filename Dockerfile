
# Use the official Node.js image as the base image
FROM node:12

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN npm install

EXPOSE 8080
CMD [ "node", "server.js" ]
