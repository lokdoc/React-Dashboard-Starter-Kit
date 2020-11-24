/*
    Assuming that this script is launched as : 
    user : react-dashboard
    role : database-administrator 
    
*/

CREATE USER rdsk WITH PASSWORD 'rdsk-admin' CREATEDB;

/* Creating  dashboard's main database */
CREATE DATABASE dashboard
    WITH 
    OWNER = rdsk
    CONNECTION LIMIT = -1;



/* Granting all privs to the API user on that table  */
GRANT ALL PRIVILEGES ON DATABASE dashboard TO rdsk;


/* Connection to the database */
\c dashboard

CREATE EXTENSION pgcrypto;

/* Creating Users Table  */
CREATE TABLE IF NOT EXISTS users
(
    id          VARCHAR(256) PRIMARY KEY NOT NULL,
    type        VARCHAR(5)   NOT NULL,
    username    VARCHAR(20)  UNIQUE NOT NULL,
    firstname   VARCHAR(100) DEFAULT NULL,
    lastname    VARCHAR(100) DEFAULT NULL,
    email       VARCHAR(320) DEFAULT NULL,
    password    VARCHAR(256) NOT NULL
);

CREATE SEQUENCE user_id_seq
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  NO MAXVALUE;
/* Define API user as the Owner of user's table */
ALTER SEQUENCE user_id_seq OWNER TO rdsk;
ALTER TABLE users OWNER TO rdsk;
/* Filling First User Data  */

INSERT INTO users VALUES(CONCAT('ADM_',nextval('user_id_seq')),'admin','admin','BELAHDA','LOKMENE','lokmenelokdoc@gmail.com',crypt('admin', gen_salt('bf'))::VARCHAR);
INSERT INTO users VALUES( CONCAT('USR_',nextval('user_id_seq')),'user','user','AMINE','MACRON','amine@gmail.com',crypt('user', gen_salt('bf'))::VARCHAR);
  