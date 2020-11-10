
const userModel  = require("../../data/model/user.model");
const validator = require("validator")

module.exports = 
{
    path:"mobile/checkPhone",
    run (req, res) 
    {
       
        
        res.header("Access-Control-Allow-Origin", "*");

        // Request Format Check 

        if( ! ( req.body.phone && validator.isInt(req.body.phone) && req.body.phone.length == 9 ) )
        {
            res.status(200).end("BAD-REQUEST-FORMAT")
            return;
        }

        let user = new userModel(req.body.phone);
        // Request Processing 

        if(user.exists())
        {   
            // Our client has already an account in the DB

          
            res.status(200).json({
                                    error : "USER-REGISTERED",
                                    token : user.getToken({
                                                                registered : true,
                                                                connected  : false
                                                            })
                                }) // --> Pass To password Check 
           
        }
        else
        {
            // We have a clean New Client

            user.requestOTP() // Generating PIN and sending SMS 
            res.status(200).json({
                                    response : "OTP-SENT",
                                    token : user.getToken({
                                        connected : false,
                                        registered : false,
                                        phone : req.body.phone
                                    })
                                })
            
        }

     
    }
}