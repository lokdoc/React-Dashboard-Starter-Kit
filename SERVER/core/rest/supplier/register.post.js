
const supplierModel  = require("../../data/model/supplier.model");


module.exports = 
{
    path:"supplier/register",
    run (req, res) 
    {
       
        
        res.header("Access-Control-Allow-Origin", "*");

        // Request Format Check 

        if( ! ( req.body.token ) )
        {
            res.status(404).end("ERROR")
            return;
        }

        let supplier = new supplierModel(req.body.token);
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