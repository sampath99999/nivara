# Base image for all stages
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install additional dependencies needed for Prisma and other packages
RUN apk add --no-cache python3 make g++ openssl

# Development stage
FROM base AS development
# Copy package files
COPY package.json package-lock.json* ./
# Install dependencies with dev dependencies
RUN npm ci
# Copy application code
COPY . .
# Generate Prisma client
RUN npx prisma generate
# Expose port
EXPOSE 5000
# Start development server with hot reloading
CMD ["npm", "run", "dev"]

# Builder stage
FROM base AS builder
# Copy package files
COPY package.json package-lock.json* ./
# Install dependencies
RUN npm ci
# Copy application code
COPY . .
# Generate Prisma client
RUN npx prisma generate
# Build TypeScript code
RUN npm run build

# Production dependencies stage
FROM base AS dependencies
COPY package.json package-lock.json* ./
# Install only production dependencies
RUN npm ci --production

# Production stage
FROM base AS production
# Set environment variables
ENV NODE_ENV=production
# Copy package files
COPY --from=builder /app/package.json ./
# Copy production dependencies
COPY --from=dependencies /app/node_modules ./node_modules
# Copy built application
COPY --from=builder /app/dist ./dist
# Copy Prisma schema and migrations
COPY --from=builder /app/prisma ./prisma
# Copy the generated Prisma client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# Expose port
EXPOSE 5000
# Start production server
CMD ["npm", "run", "start"]

