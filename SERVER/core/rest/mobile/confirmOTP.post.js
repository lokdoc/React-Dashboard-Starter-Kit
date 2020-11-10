
const userModel  = require("../../data/model/user.model");


module.exports = 
{
    path:"mobile/confirmOTP",
    async  run (req, res) 
    {
     
        
        res.header("Access-Control-Allow-Origin", "*");

        // Request Format Check 

        if( ! ( req.body.otp && req.body.token ) )
        {
            res.status(400).end("BAD-REQUEST-FORMAT")
            return;
        }

        let user = new userModel(token);

        // Request Processing 

        if(user.hasValidToken())
        {   

           let valid_otp = await user.verifyOTP(req.body.otp);
           if(valid_otp)
           {
                res.status(200).json({
                    response : "REGISTER-REQUEST",
                    token    : user.getToken({
                        connected  : true,
                        registered : false
                    })
                }) 
           }
           else
              res.status(200).end("BAD-OTP")

           
            
           
        }
        else
        {
            res.status(404).end("ERROR")
            
        }

     
    }
}