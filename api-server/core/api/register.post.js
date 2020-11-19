
const userModel  = require("../data/model/user.model");
const { validator } = require("validator");

module.exports = 
{
    path:"mobile/register",
    run (req, res) 
    {
        res.header("Access-Control-Allow-Origin", "*");
        
        // Request Format Check 

        if( ! (    req.body.token 
                && req.body.name 
                && req.body.fname
                && req.body.email && validator.isEmail(req.body.email)
                && req.body.wilaya
                && req.body.password
               ) )
        {
            res.status(404).end("ERROR")
            return;
        }

        let user = new userModel(req.body.token);
        // Request Processing 

        if(user.connected())
        {   
            res.status(200).json({
               profile : user.getProfile(),
               token   : user.getToken()
            })
           
        }
        else
        {
            if(user.expiredToken())
            {
                res.status(400).json({
                    error : "EXPIRED-TOKEN"
                 })
            }
            else
            {
                res.status(404).end("NOT FOUND")
            }
            
            
        }

     
    }
}