FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/

# Install backend dependencies
RUN cd backend && npm install --only=production

# Copy backend source code
COPY backend/ ./backend/

# Expose port
EXPOSE 4000

# Start the application
CMD ["node", "backend/index.js"]