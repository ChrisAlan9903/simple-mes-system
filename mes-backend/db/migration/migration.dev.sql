-- This file contains the SQL commands to create the database schema for the development environment.
-- DB: PostgreSQL




-- Production Orders Table
CREATE TABLE production_orders (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    start_date TIMESTAMP ,
    expected_end_date TIMESTAMP ,
    actual_end_date TIMESTAMP ,
    status VARCHAR(50) NOT NULL, -- Planned, In Progress, Completed, Cancelled
    remarks TEXT
);

-- Quality Inspections Table
CREATE TABLE quality_inspections (
    id SERIAL PRIMARY KEY,
    production_order_id INTEGER REFERENCES production_orders(id) ON DELETE CASCADE,
    inspection_status VARCHAR(100) NOT NULL,  -- scheduled, ongoing, completed, cancelled
    inspection_date TIMESTAMP NOT NULL,
    inspector_name VARCHAR(255) NOT NULL,
    result VARCHAR(50), -- Pass, Fail
    quantity_inspected INTEGER,
    defects_count INTEGER,
    remarks TEXT
);

-- Machine Utilization Table (Optional)
CREATE TABLE machine_utilization (
    id SERIAL PRIMARY KEY,
    machine_name VARCHAR(255) NOT NULL,
    utilization_rate FLOAT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);