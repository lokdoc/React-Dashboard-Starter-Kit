const pool =  require("../data/provider/pool")
const isAuthenticated  = require("../data/utils/isAuthenticated");
const UserClass  = require("../data/model/user");

module.exports = 
{
    async run (req, res) 
    {
        
        if(isAuthenticated(req,"refresh"))
        {
            let user = await UserClass.loginByToken(req);
           
            if(user)
            {   
                let access_token = user.getAccessToken();
                let refresh_token = user.getRefreshToken();
    
                res.status(200).json(
                    {
                        "access-token" : access_token,
                        "refresh-token" : refresh_token
                    })
               
            }
            else
            {
                    res.status(401)
                    .end("USER-NOT-FOUND") 
            }
        }
        else
        {
            res.status(401)
            .end("BAD-TOKEN") 
        }

       
    }
}

