
const { Pool } = require('pg')
const config = require('../../../config.json');

// Database Pool Initilizing based on project Config  

module.exports = new Pool({
    host:       config.database.host,
    user:       config.database.user,
    database:   config.database.database,
    password:   config.database.password,
    port:       config.database.port,
    max:        config.database.max_pool,
    idleTimeoutMillis:        config.database.max_pool.idleTimeoutMillis,
    connectionTimeoutMillis:  config.database.max_pool.connectionTimeoutMillis
  })