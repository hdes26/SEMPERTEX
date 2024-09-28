###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./ 

# Install project dependencies
RUN npm install

# Copy the project source code to the container
COPY . .

RUN chown -R node:node /usr/src/app/src/database/core/migrations

# Run the build script
RUN npm run build

# Use the node user from the image (instead of the root user)
USER node

# Command to generate migrations (only when needed)
CMD ["sh", "-c", "npm run migration:generate && npm run migration:up && node dist/main.js"]
