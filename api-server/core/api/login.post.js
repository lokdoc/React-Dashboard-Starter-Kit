
const UserClass  = require("../data/model/user");
const isAuthenticated  = require("../data/utils/isAuthenticated");

module.exports = 
{
    path:"login",
    async run (req, res) 
    {
       
        console.log("REQUESTED - LOGIN ")
        console.log(req.body);

        let user =  await UserClass.loginByCredentials(req.body.user,req.body.pass);
        
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
                .end("BAD-CREDENTIALS") 
        }

     
    }
}