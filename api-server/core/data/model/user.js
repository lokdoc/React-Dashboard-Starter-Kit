const pool   =  require("../provider/pool")
const config =  require("../../../config.json")
const fs = require('fs')
var jwt = require('jsonwebtoken');


class user
{
  
  
  // User constructor 
  constructor( param )
  {

   
          this.id = param.id
          this.type = param.type
          this.username = param.username
          this.firstname = param.firstname
          this.lastname = param.lastname
          this.email = param.email
  }

  static async getAllUsers()
  {

      const SQL = `SELECT id,username,firstname,lastname,email FROM users`
      const client = await pool.connect()
  
      //  Fetching results 

     let ret = await client.query(SQL);
     client.release()
     return ret.rows
   

  }
  static async createUser(username,firstname="",lastname="",email="",password)
  {
    try 
    {
      // Getting User's by checking password (BCRYPT ENCODED)

      const SQL = `INSERT INTO users 
                  VALUES(CONCAT('USR_',nextval('user_id_seq')),'user',$1,$2,$3,$4,
                  crypt($5, gen_salt('bf'))::VARCHAR);`


      // ( Prepared Statement's values )
      const values = [username,firstname,lastname,email,password];

      // Getting a client from the pool 
      const client = await pool.connect()
      console.log("POOL LOADED")

      //  Fetching results 

      let ret = await client.query(SQL,values);
      console.log("POOL LOADED")

        // if we found the user's credentials are correct 
        if( ret.rowCount > 0 )
        {
          // Disconnect DB
          client.release()

          // Return User
          return new this(ret.rows[0])
        }
     
       client.release()
       return null;
    }
    catch (err) 
    {
      console.log(err.stack)
      throw "BAD-LOGIN"
    }
  }

  isAdmin()
  {
    return this.type == "admin"
  }

  getToken(data)
  {
   
    var privateKey = fs.readFileSync(__dirname+'/../../../private.key');
    var token = jwt.sign({
      data: data,
      uid : this.id,
      exp: Math.floor(Date.now() / 1000) + ( config.jwt["access-token"]["expiration-minutes"] * 60),
    }, privateKey, { algorithm: 'RS256' });
    return token
  }

  
  getAccessToken(data)
  {
   
    var privateKey = fs.readFileSync(__dirname+'/../../../private.key');
    var token = jwt.sign({
      type : this.type,
      key  : "access",
      uid : this.id,
      exp: Math.floor(Date.now() / 1000) + ( config.jwt["access-token"]["expiration-minutes"] * 60),
    }, privateKey, { algorithm: 'RS256' });
    return token
  }

  getRefreshToken(data)
  {
   
    var privateKey = fs.readFileSync(__dirname+'/../../../private.key');
    var token = jwt.sign({
      type : this.type,
      key  : "refresh",
      uid : this.id,
      exp: Math.floor(Date.now() / 1000) + ( config.jwt["refresh-token"]["expiration-minutes"] * 60 ),
    }, privateKey, { algorithm: 'RS256' });
    return token
  }

  static async loginByCredentials(user, password )
  {
    try 
    {
      // Getting User's by checking password (BCRYPT ENCODED)
      const SQL = `SELECT * 
                  FROM users 
                  WHERE 
                  userName = $1
                  AND password = crypt( $2 ,password);`
      // ( Prepared Statement's values )
      const values = [user, password];

      // Getting a client from the pool 
      const client = await pool.connect()

      //  Fetching results 

      let ret = await client.query(SQL,values);
      
        // if we found the user's credentials are correct 
        if( ret.rowCount > 0 )
        {
          // Disconnect DB
          client.release()

          // Return User
          return new this(ret.rows[0])
        }
     
       client.release()
       return null;
    }
    catch (err) 
    {
      console.log(err.stack)
      throw "BAD-LOGIN"
    }

    

  }
   static async loginByToken(req)
  {
      let token = req.headers.authorization.substr("Bearer ".length);
      let uid = jwt.decode(token).uid
    
      try 
      {
        // Getting User's by User ID
        const SQL = `SELECT * 
                    FROM users 
                    WHERE 
                    id = $1 ;`
        // ( Prepared Statement's values )
        const values = [uid];

        // Getting a client from the pool 
        const client = await pool.connect()

        //  Fetching results 

        let ret = await client.query(SQL,values);
        
          // if we found the user
            if( ret.rowCount > 0 )
          {
              client.release()
              return new this(ret.rows[0])
          }
      
        client.release()
        return null;

       
      }
      catch (err) 
      {
        console.log(err.stack)
        throw "USER-NOT-FOUND"
      }

    } 

  async select(columns, clause) 
  {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

}

module.exports = user;