DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    profile_url VARCHAR(128)
);

GRANT ALL PRIVILEGES ON employees.* TO 'betty'@'%';
FLUSH PRIVILEGES;