# Multi-stage Dockerfile for Wilderness Dojo CRM & Field Operations

# Stage 1: Build stage
FROM node:22-slim AS builder

WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json* bun.lock* ./

# Install dependencies (including devDependencies for TypeScript & Vite)
RUN npm install

# Copy application source code
COPY . .

# Build Vite frontend and bundle Express server
RUN npm run build

# Stage 2: Production runner
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package manifests
COPY package.json package-lock.json* bun.lock* ./

# Install only production dependencies
RUN npm install --omit=dev && npm cache clean --force

# Copy compiled frontend assets and bundled server from builder
COPY --from=builder /app/dist ./dist

# Run as non-root user for container security
USER node

# Expose default application port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/api/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));"

# Start the application
CMD ["node", "dist/server.cjs"]
