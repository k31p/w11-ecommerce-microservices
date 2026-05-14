FROM node:20-alpine

WORKDIR /app/

# Copy package.json and yarn.lock from order-service
COPY order-service/package.json order-service/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile/

# Copy source code from order-service
COPY order-service/ .

# Build the application
RUN yarn build

EXPOSE 3002

CMD ["node", "dist/main"]
