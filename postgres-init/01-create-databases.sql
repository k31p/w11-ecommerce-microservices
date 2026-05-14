-- Create databases for all services
CREATE DATABASE orchestrator_db;
CREATE DATABASE order_db;
CREATE DATABASE inventory_db;
CREATE DATABASE payment_db;
CREATE DATABASE shipping_db;

-- Grant privileges to postgres user (default in postgres:15-alpine)
GRANT ALL PRIVILEGES ON DATABASE orchestrator_db TO postgres;
GRANT ALL PRIVILEGES ON DATABASE order_db TO postgres;
GRANT ALL PRIVILEGES ON DATABASE inventory_db TO postgres;
GRANT ALL PRIVILEGES ON DATABASE payment_db TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shipping_db TO postgres;
