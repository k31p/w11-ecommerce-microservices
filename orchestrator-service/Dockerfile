FROM node:20-alpine

WORKDIR /app/

# Copy package.json and yarn.lock from orchestrator-service
COPY orchestrator-service/package.json orchestrator-service/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code from orchestrator-service
COPY orchestrator-service/ .

# Build the application
RUN yarn build

EXPOSE 3001

CMD ["node", "dist/main"]
