const fs = require('fs')
const jwt = require('jsonwebtoken')
// JWT Checker 

module.exports = function(req, key = "access")
{
    // Verfify if access token / refresh token 
    
    if(req.headers.authorization)
    { 
     
        // Getting Token from header
        let token = req.headers.authorization.substr("Bearer ".length);

        // Loading RSA-PUB-KEY
        var public = fs.readFileSync(__dirname+'/../../../public.key');

        try
        {
          // Checking if the token is issued by the API
          let decoded = jwt.verify(token, public)
          if(decoded.key == key)
            return true;

        }
        catch(e)
        {
          console.log(e)
          // Token Invalid or Expired 
            return false;
        }
        
         
    }

    return false;
}