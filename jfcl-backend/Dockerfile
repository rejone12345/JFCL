FROM node:20-alpine AS runner

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application source code
COPY src/ ./src/

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "src/server.js"]
