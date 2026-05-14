FROM node:20-alpine

WORKDIR /app/

# Copy package.json and yarn.lock from shipping-service
COPY shipping-service/package.json shipping-service/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile/

# Copy source code from shipping-service
COPY shipping-service/ .

# Build the application
RUN yarn build

EXPOSE 3005

CMD ["node", "dist/main"]
