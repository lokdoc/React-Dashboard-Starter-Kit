
const { Pool } = require('pg')
module.exports = new Pool({
    host: 'localhost',
    user: 'sordipay_ws',
    database: 'sordipay',
    password: 'sordi@#pay@#2020@#',
    port: 5432,
    max: 1000,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })