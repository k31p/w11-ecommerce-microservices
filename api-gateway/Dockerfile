FROM node:20-alpine

WORKDIR /app/

# Copy shared-library files and build it inside the image
COPY shared-library/package.json shared-library/yarn.lock shared-library/tsconfig.json ./shared-library/
COPY shared-library/src ./shared-library/src
RUN yarn --cwd shared-library install --frozen-lockfile
RUN yarn --cwd shared-library build

# Copy api-gateway package files and update shared-library path
COPY api-gateway/package.json api-gateway/yarn.lock api-gateway/tsconfig.json ./
# Fix the shared-library path to be relative to /app
RUN sed -i 's|file:../shared-library|file:./shared-library|g' package.json yarn.lock

# Install api-gateway dependencies
RUN yarn install --frozen-lockfile

# Copy api-gateway source code
COPY api-gateway/src ./src

# Build the application
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]
