FROM node:20-alpine

WORKDIR /app/

# Copy package.json and yarn.lock from payment-service
COPY payment-service/package.json payment-service/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile/

# Copy source code from payment-service
COPY payment-service/ .

# Build the application
RUN yarn build

EXPOSE 3004

CMD ["node", "dist/main"]
