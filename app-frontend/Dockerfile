# Use Node 16 LTS as base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 (or the port your app uses)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
