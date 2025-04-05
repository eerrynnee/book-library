# Use Node.js as base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY ./frontend /app/frontend

# Set working directory inside frontend
WORKDIR /app/frontend

# Build the React app
RUN npm run build

# Expose the Vite development port
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev", "--", "--host"]
