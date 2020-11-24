
const UserClass  = require("../data/model/user");
const  validator = require("validator");

module.exports = 
{
    path:"register",
    async run(req, res) 
    {
        res.header("Access-Control-Allow-Origin", "*");

     
        // Data Integrity Checking  in server 

        if(req.body.email && !validator.isEmail(req.body.email))
        {    
            res.status(400).end("EMAIL-BAD-FORMAT") 
            return
        }
            
        if(req.body.username && !validator.matches(req.body.username ,/[a-zA-Z0-9_.]{3,}/ ))
        {
            res.status(400).end("USERNAME-BAD-FORMAT") 
            return
        }  
        
        if(!req.body.username) 
        {
            res.status(400).end("BAD-REQUEST") 
            return
        }   
         
        if(!req.body.password)
        {
            res.status(400).end("BAD-REQUEST") 
            return
        }

       
      
        try
        {
            let form = req.body
            let user = await UserClass.createUser(  req.body.username
                                             ,req.body.firstname
                                             ,req.body.lastname
                                             ,req.body.email
                                             ,req.body.password
                                             )

                            console.log(user)
            let access_token = user.getAccessToken()
            let refresh_token = user.getRefreshToken()
                
              res.status(200).json(
                {
                    "access-token" : access_token,
                    "refresh-token" : refresh_token
                }).end()
        
        }
        catch(err)
        {
            console.log(err)
            res.status(403).end(err) 
        }
     
    }
}