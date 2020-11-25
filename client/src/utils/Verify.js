var jwt = require('jsonwebtoken');
const config = require("../config.json")
const API_HOST = config.host + ":" + config.port 



export const VerifyToken = async (token = null)=>
{
    let key = await getPublicKey()

    let data = jwt.verify(token, key, { algorithms: ['RS256'] });
   
    return data
}
export const getUserType = ()=>
{
    let access = localStorage.getItem("access-token")
    let pub_key = localStorage.getItem("pub_key");
    try
    {
        let data = jwt.verify(access, pub_key, { algorithms: ['RS256'] });
        return data.type
    }
    catch
    {
        return null
    }
    
    
}


export const RefreshTokens = async function()
{
    try
    {
       

        let refresh = localStorage.getItem("refresh-token")
        let pub_key = await getPublicKey()  

        let response = await fetch( API_HOST + "/token", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization" : "Bearer "+ refresh
            },
        })    
      
       
            response = await response.json();
           
            let access  = await VerifyToken(response["access-token"])
                refresh = await VerifyToken(response["refresh-token"])

            if(access && refresh)
            {
              
                localStorage.setItem("access-token" ,response["access-token"])
                localStorage.setItem("refresh-token" ,response["refresh-token"])

            }
        
        
        
    }
    catch(err)
    {
        console.log(err)
       
    }
      

}

/*
    This function shows if the current user is logged in or not  
*/
export const isConnected = function()
{

    // Loading Tokens 
  let access = localStorage.getItem("access-token")
  let refresh = localStorage.getItem("refresh-token")
  let pub_key = localStorage.getItem("pub_key");

  // Checking localStorage 
  if(access && refresh && pub_key )
  {
      let valid_access_token = true;
      let valid_refresh_token = true;

      // checking access token 
      try
      {

        access = jwt.verify(access, pub_key, { algorithms: ['RS256'] });
        valid_access_token = true;      
      }
      catch(e)
      { 
           valid_access_token = false;      
      }
      // Checking refresh token 
      try
      {
        refresh = jwt.verify(refresh, pub_key, { algorithms: ['RS256'] });
        valid_refresh_token = true
      }
      catch(e)
      { 
        valid_refresh_token = false;      
      }
      
     // if they both validated so OK 
      if(valid_access_token &&  valid_refresh_token)
        return true;

        // if they are invalid both of them so we reject 
      if(!valid_access_token && ! valid_refresh_token)
        return false;
    
        // if refresh token is bad so , it's rejected too 

      if(!valid_refresh_token)
        return false;
    
        // if we have only expired access token 

        if(!valid_access_token && valid_refresh_token)
        {
            // Perform Refresh Access token 
            RefreshTokens();
        }
  } 
 
  return false

}


export const getPublicKey = async ()=>
{
    let pub_key = localStorage.getItem("pub_key");

    if(pub_key)
    {
        return pub_key;

    }
    else
    {
        let URL = config.host + ":" + config.port + "/public_key"
        let ret = await (await fetch( URL)).text();
        localStorage.setItem("pub_key",ret);
        return ret;
    }

}