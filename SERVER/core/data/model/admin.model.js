const pool =  require("../provider/pool")

class adminModel 
{
  constructor(table) 
  {
   
  }

  async select(columns, clause) 
  {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

}

module.exports = adminModel;