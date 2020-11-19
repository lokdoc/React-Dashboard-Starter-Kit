const fs = require('fs');
const MAIN_PATH ="./core/api/"
    
async function load(app,path="")
    {
        // Finding Routes
        
        var routes = []

        fs.readdir(MAIN_PATH+path,function(err,files)
        {
            
            files.forEach((file)=>
            {
        
                
                let file_abs = MAIN_PATH+path+file

                if(!fs.lstatSync(file_abs).isDirectory())
                {
                    
                    let component = require(file_abs);
                    
               
                    routes.push({
                                method : component.method ? component.method : file.split(".")[1],
                                run    : typeof component == "function" ? component : component.run,
                                path   : component.path ? component.path : file.split(".")[0]
                            })
                        
                    
                }
                else
                {
                    load(app,path+file+"/")
                }
            
            });
                // Load Routes to the App 

                routes.forEach((route)=>
                {
                    // route.method : GET or POST 
                    // route.run  : running function

                    console.log(`[+] Loading API-ROUTE : [${route.method}]${route.path}`)
                    app[route.method]("/api/"+route.path,route.run); 
                })
      
        })
    }






module.exports = { load : load};