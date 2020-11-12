const pool =  require("../provider/pool")

class user
{
  constructor(id)
  {


      this.username = "";
      this.fisrtName = "";
      this.lastName = "";
      this.email = "";
      this.type = "";


      throw "USER-NOT-EXISTANT"
  }

  

  async select(columns, clause) 
  {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

}

module.exports = user;