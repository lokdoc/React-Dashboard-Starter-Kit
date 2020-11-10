
const adminModel  = require("../../data/model/admin.model");


module.exports = 
{
    path:"admin/login",
    run (req, res) 
    {
       
        
        res.header("Access-Control-Allow-Origin", "*");

        // Request Format Check 

        if( ! ( req.body.token ) )
        {
            res.status(404).end("ERROR")
            return;
        }

        let admin = new adminModel(req.body.token);
        // Request Processing 

        if(user.connected())
        {   
            res.status(200).json({
               profile : user.getProfile(),
               token   : user.getToken()
            })
           
        }
        

     
    }
}