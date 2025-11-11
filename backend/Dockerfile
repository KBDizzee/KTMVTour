#            Build Stage
# ------------******------------

# Base image:
FROM node:22.16.0-alpine AS build

# Working dir inside container:
WORKDIR /app_backend

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci

# copy source code, ignore files in dockerignore
COPY . .

# Build TS into JS
RUN npm run build

#          Runtime Stage
# ------------******------------
FROM node:22.16.0

WORKDIR /app_backend

# Copy only package.json and package-lock.json from the build stage
COPY --from=build /app_backend/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy compiled JS files from the build stage
COPY --from=build /app_backend/build ./build

# Expose backend port
EXPOSE 8080

# Command to run app
CMD ["npm", "run", "node"]



