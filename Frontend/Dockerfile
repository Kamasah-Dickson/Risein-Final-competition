# Specify the base image to use for the container
FROM node:18-alpine

# Set the working directory to /app in the container
WORKDIR /app

# Copy all files from the current directory to the /app directory in the container
COPY . /app

# Copy the package.json and package-lock.json files from the current directory to the /app directory in the container
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy the next.config.js file from the current directory to the /app directory in the container
COPY next.config.js ./next.config.js

# Expose port 3000 for the container
EXPOSE 3000

# Start the development server using npm when the container is run
CMD ["npm", "run", "dev"]
