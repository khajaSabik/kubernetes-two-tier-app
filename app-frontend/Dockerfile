# -----------------------------
# Build stage
# -----------------------------
FROM node:18 AS build

WORKDIR /app

# Copy package.json & package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Optional: Accept API URL as build arg (used only at build time)
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build React app
RUN npm run build

# -----------------------------
# Production stage
# -----------------------------
FROM nginx:alpine

# Copy React build to Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy runtime config.js for dynamic backend URL
COPY public/config.js /usr/share/nginx/html/config.js

# Expose port 80
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
