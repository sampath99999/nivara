# Base image for all stages
FROM node:20-alpine AS base
WORKDIR /app

# Development stage
FROM base AS development
# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci
# Copy application code
COPY . .
# Expose port
EXPOSE 3000
# Start development server with hot reloading
CMD ["npm", "run", "dev"]

# Dependencies stage for production
FROM base AS dependencies
COPY package.json package-lock.json* ./
RUN npm ci --production

# Builder stage
FROM base AS builder
COPY package.json package-lock.json* ./
# Install all dependencies including dev dependencies
RUN npm ci
# Copy application code
COPY . .
# Build the application
RUN npm run build

# Production stage
FROM base AS production
# Set environment variables
ENV NODE_ENV=production
# Copy package.json from builder
COPY --from=builder /app/package.json ./
# Copy only production dependencies
COPY --from=dependencies /app/node_modules ./node_modules
# Copy build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
# Expose port
EXPOSE 3000
# Start production server
CMD ["npm", "run", "start"]

