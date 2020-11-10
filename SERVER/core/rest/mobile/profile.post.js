
const userModel  = require("../../data/model/user.model");


module.exports = 
{
    path:"mobile/profile",
    run (req, res) 
    {
       
        
        res.header("Access-Control-Allow-Origin", "*");

        // Request Format Check 

        if( ! ( req.body.token ) )
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