
const UserClass  = require("../data/model/user");
const isAuthenticated  = require("../data/utils/isAuthenticated");



module.exports = 
{
    path:"users",
    async run (req, res) 
    {
       
        
        res.header("Access-Control-Allow-Origin", "*");  
        
        if(isAuthenticated(req))
        {
            let user = await UserClass.loginByToken(req)
         
            if(user.isAdmin())
            {
                let users = await UserClass.getAllUsers() ;
                res.json(user.getToken(users));
            }
            else
            {
                res.status(403)
                .end("REQUIRED-PRIVILEGES") 
            }
          

        }
        else
        {
            res.status(401)
            .end("BAD-TOKEN") 
        }
       
    }
}