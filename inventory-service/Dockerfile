FROM node:20-alpine

WORKDIR /app/

# Copy package.json and yarn.lock from inventory-service
COPY inventory-service/package.json inventory-service/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code from inventory-service
COPY inventory-service/ .

# Build the application
RUN yarn build

EXPOSE 3003

CMD ["node", "dist/main"]
