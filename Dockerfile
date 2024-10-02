# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the app for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
