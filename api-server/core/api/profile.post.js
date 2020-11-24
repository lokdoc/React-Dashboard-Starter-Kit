
const UserClass  = require("../data/model/user");
const isAuthenticated  = require("../data/utils/isAuthenticated");



module.exports = 
{
    path:"profile",
    async run (req, res) 
    {
       
        
        res.header("Access-Control-Allow-Origin", "*");  
        
        if(isAuthenticated(req))
        {
            let user = await UserClass.loginByToken(req)
         

            res.json(user.getToken(
                {
                    data:{
                            id : user.id,
                            type : user.type,
                            username : user.username,
                            firstname : user.firstname,
                            lastname : user.lastname,
                            email : user.email
                        }
                 }));

     }
        else
        {
            res.status(401)
            .end("BAD-TOKEN") 
        }
    }
}