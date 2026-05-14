FROM node:20-alpine

WORKDIR /app/

# Copy shared-library
COPY shared-library/ ./shared-library/

# Copy api-gateway package.json and update shared-library path
COPY api-gateway/package.json api-gateway/yarn.lock ./
# Fix the shared-library path to be relative to /app
RUN sed -i 's|file:../shared-library|file:./shared-library|g' package.json yarn.lock

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY api-gateway/ .

# Build the application
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]
