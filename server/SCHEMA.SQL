
CREATE USER rdsk WITH PASSWORD 'rdsk@demo@';

CREATE DATABASE bds;
\c bds;

CREATE TABLE IF NOT EXISTS users
(
    id          VARCHAR(256) PRIMARY KEY NOT NULL,
    type        VARCHAR(5) NOT NULL,
    userName    VARCHAR(20) UNIQUE NOT NULL,
    firstName   VARCHAR(100),
    lastName    VARCHAR(100),
    email       VARCHAR(320) not null,
    password    VARCHAR(256) not null

);