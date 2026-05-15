# Issues

Guidelines for writing issues on this file
1. Always write the date of the issue and the issue code. For the issue code write it in format `IS-{ISSUE_NUMBER}-{DATE}`. Example: `IS-01-20260508`
2. If an issue is finished, move it into `Closed Issue` segment and give it the status label based on the condition. See `Status Table` for details

### Open Issues



#### IS-17-20260515: Missing migrations or schema initialization after `synchronize: false`

**Date**: 2026-05-15
**Severity**: High
**Description**: Most services have `synchronize: false` but no migrations or SQL schema initialization. This causes runtime errors like missing relations when the service first hits the database. Orchestrator now has a migration for `sagas`, but other services still lack migrations.

**Impact**: Services can fail at runtime with `relation does not exist` errors.

---

#### IS-04-20260508: Improper shared-library implementation
#### IS-02-20260508: Incorrect Dockerfile port configurations

**Date**: 2025-05-08
**Severity**: High
**Description**: All Dockerfiles have `EXPOSE 3000` but services run on different ports:
- api-gateway: 3000 (correct)
- orchestrator-service: 3001 (wrong in Dockerfile)
- order-service: 3002 (wrong in Dockerfile)
- inventory-service: 3003 (wrong in Dockerfile)
- payment-service: 3004 (wrong in Dockerfile)
- shipping-service: 3005 (wrong in Dockerfile)

**Note**: Fixed in Yarn migration - all Dockerfiles now have correct ports.

**Impact**: Docker containers will expose wrong ports, causing confusion and potential deployment issues.

---

#### IS-04-20260508: Improper shared-library implementation

**Date**: 2025-05-08
**Severity**: Critical
**Description**: The shared-library is not packaged as a proper npm module. Services import directly from source using relative paths:
```typescript
import { HttpExceptionFilter } from '../../../shared-library/src/filters/http-exception.filter';
```

**Problems**:
- Path `../../../shared-library/src/` won't work in Docker containers
- Shared code should be built as a separate package and referenced via package.json
- No build artifacts (dist folder) for shared library
- No package.json for shared-library

**Impact**: Code cannot be properly shared between services or built in Docker.

---

#### IS-05-20260508: Hardcoded database configurations

**Date**: 2025-05-08
**Severity**: High
**Description**: Database configuration is hardcoded in each service's `app.module.ts` instead of using:
- Environment variables consistently
- Configuration files
- Config service (like @nestjs/config)

**Example from orchestrator-service**:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'orchestrator_db',
  // ...
})
```

**Issues**:
- Default values hardcoded ('postgres', 'orchestrator_db')
- No validation of required environment variables
- Inconsistent env var names (DB_NAME vs ORDER_DB_NAME, INVENTORY_DB_NAME, etc.)

**Impact**: Configuration management is messy and error-prone.

---

#### IS-06-20260508: TypeORM synchronize:true in codebase

**Date**: 2025-05-08
**Severity**: Medium
**Description**: All services use `synchronize: true` in TypeORM configuration. This is dangerous for production as it automatically synchronizes database schema.

**Impact**: Risk of data loss or schema corruption in production environments.

---

#### IS-07-20260508: Missing Redis service in docker-compose

**Date**: 2025-05-08
**Severity**: Medium
**Description**: README mentions Redis as message broker, but docker-compose.yml doesn't include a Redis service. The services likely need Redis for communication but it's not configured.

**Impact**: Services requiring Redis will fail to connect.

---

#### IS-08-20260508: No health checks for microservices

**Date**: 2025-05-08
**Severity**: Medium
**Description**: Only the postgres service has a healthcheck configured. All microservices should have health endpoints and Docker healthchecks for proper orchestration.

**Impact**: Docker compose cannot properly manage service dependencies and readiness.

---

#### IS-09-20250508: CORS enabled without restrictions

**Date**: 2025-05-08
**Severity**: Low
**Description**: API Gateway enables CORS without any restrictions:
```typescript
app.enableCors();
```

**Impact**: Security risk - any origin can access the API.

---

#### IS-10-20250508: No .env files or environment variable documentation

**Date**: 2025-05-08
**Severity**: High
**Description**: No `.env.example` files exist for any service. Environment variables are scattered and undocumented.

**Impact**: Difficult to set up local development environment.

---

#### IS-11-20250508: Missing dist directories and build configuration

**Date**: 2025-05-08
**Severity**: Critical
**Description**: Dockerfiles copy from `./dist` directory, but no dist directories exist. There's no build step configured.

**Impact**: Docker builds will fail due to missing dist directory.

---

#### IS-12-20250508: Inconsistent Dockerfile structure

**Date**: 2025-05-08
**Severity**: Medium
**Description**: All Dockerfiles are identical but should be customized per service. They also:
- Don't copy source code (only dist)
- Don't have a build stage (multi-stage build)
- Copy package*.json before source code but package.json doesn't exist

**Impact**: Docker builds are broken.

---

#### IS-13-20250508: No npm scripts or build configuration

**Date**: 2025-05-08
**Severity**: High
**Description**: Without package.json files, there are no npm scripts defined for:
- Building the TypeScript code
- Running in development mode
- Running in production mode
- Testing

**Impact**: Cannot run or build the project.

---

#### IS-14-20250508: Missing .dockerignore in some services

**Date**: 2025-05-08
**Severity**: Low
**Description**: Need to verify all services have .dockerignore files. Currently only api-gateway and orchestrator-service were confirmed to have them.

**Impact**: Docker builds may include unnecessary files.

---

#### IS-15-20250508: No unified configuration management

**Date**: 2025-05-08
**Severity**: Medium
**Description**: Each service manages its own configuration independently. There's no:
- Shared configuration module
- Consistent environment variable naming
- Configuration validation

**Impact**: Configuration inconsistencies across services.

### Closed Issues

#### IS-19-20260515: API Gateway health endpoint is double-prefixed [RESOLVED]

**Date**: 2026-05-15
**Resolved**: 2026-05-15
**Resolution**: Removed the duplicate controller prefix so the health endpoint is `/api/v1/health`, matching the global prefix and docker-compose health check.

---

#### IS-18-20260515: Dockerfile command typos in service builds [RESOLVED]

**Date**: 2026-05-15
**Resolved**: 2026-05-15
**Resolution**: Fixed `RUN yarn install --frozen-lockfile/` and `EXPOSE 3001/` typos in service Dockerfiles.

---

#### IS-01-20260508: Missing package.json in all services [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: Created `package.json` for all services (api-gateway, orchestrator-service, order-service, inventory-service, payment-service, shipping-service) and shared-library. All use Yarn with `packageManager` field set to `yarn@1.22.22`. Dependencies installed via `yarn add` commands.

---

#### IS-13-20250508: No npm scripts or build configuration [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: Added proper scripts to all package.json files: `build` (tsc), `start` (node dist/main.js), `start:dev` (tsc-watch). All services now build successfully.

---

#### IS-11-20250508: Missing dist directories and build configuration [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: All Dockerfiles now use multi-stage builds that create dist/ directory. Each service builds successfully with `yarn build`.

---

#### IS-12-20250508: Inconsistent Dockerfile structure [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: All Dockerfiles now use consistent multi-stage build pattern with Yarn. Each Dockerfile has correct EXPOSE port (3000-3005).

---

#### IS-14-20250508: Missing .dockerignore in some services [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: All services have .dockerignore files that exclude package-lock.json and keep yarn.lock.

---

#### IS-07-20260508: Missing Redis service in docker-compose [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: Added Redis 7-alpine service to docker-compose.yml with health check. Configured orchestrator-service to use Redis (REDIS_HOST, REDIS_PORT).

---

#### IS-08-20260508: No health checks for microservices [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: Added /health endpoints to all services. Updated docker-compose.yml with healthcheck configurations for all services. Services now depend on health checks via depends_on conditions.

---

#### IS-05-20260508: Hardcoded database configurations [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: Implemented `@nestjs/config` for all services. Created `.env.example` files for each service. Standardized environment variable names. Removed hardcoded defaults.

---

#### IS-06-20260508: TypeORM synchronize:true in codebase [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: Changed `synchronize: true` to `false` for all services. Prepared for proper migrations.

---

#### IS-10-20250508: No .env files or environment variable documentation [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: Created `.env.example` files for all 6 services. Documented all environment variables.

---

#### IS-15-20250508: No unified configuration management [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: Implemented `@nestjs/config` for all services. Standardized configuration across services.

---

#### IS-09-20250508: CORS enabled without restrictions [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: Configured CORS with environment variable CORS_ORIGINS. Defaults to open CORS with warning if not set. Documented in .env.example.

---

#### IS-14-20250508: Missing .dockerignore in some services [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: All services have .dockerignore files that exclude package-lock.json and keep yarn.lock.

---

### Phase 5 Complete! ✅

#### IS-16-20250508: Inconsistent code quality across services [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: Reviewed all service implementations. Applied consistent coding patterns. Added error handling improvements. Added logging where missing. Improved saga orchestrator implementation.

---

### Phase 5 Complete! ✅


#### IS-03-20260508: Missing package-lock.json files [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08
**Resolution**: Migrated to Yarn package manager. Now using `yarn.lock` instead of `package-lock.json`. All Dockerfiles updated to use `yarn install --frozen-lockfile`.

---

#### IS-02-20260508: Incorrect Dockerfile port configurations [RESOLVED]

**Date**: 2025-05-08
**Resolved**: 2025-05-08  
**Resolution**: Fixed during Yarn migration. All Dockerfiles now have correct EXPOSE ports (3000-3005) and use multi-stage builds with Yarn.

---



# References

## Status Table

| Label     | Purpose                                                                 |
| --------- | ----------------------------------------------------------------------- |
| RESOLVED  | To indicate that the issue has been resolved                            |
| DELEGATED | To indicate that the issue has been purposely ignore to be fixed later  |
