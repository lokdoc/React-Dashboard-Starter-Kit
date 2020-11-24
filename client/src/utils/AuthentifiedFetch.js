var jwt = require('jsonwebtoken');
const config = require("../config.json")
import {getPublicKey,isConnected,RefreshTokens} from "./Verify"
const API_HOST = config.host + ":" + config.port 


/*
AuthentifiedFetch is a function that do that process  : 

IF ( ACCESS_TOKEN->EXPIRED )
    IF ( REFRESH_TOKEN -> EXPIRED )
            LOGOUT()
            EXIT()
    ELSE
        REFRESH-TOKENS()

REQUESTING_SERVER()
FETCHING_DATA()
CHECKING_AUTHENTICITY_WITH_RSA_KEY()
IF ( AUTHENTIQUE_SIGNED_BY_SERVER_PRIVATE_KEY )
    RETURN DATA
ELSE
    THROW EXCEPTION 


*/

const FetchAction = async function(URL)
{

}

export default  async function AuthentifiedFetch(URL)
{
    let access = localStorage.getItem("access-token")
    let pub_key = await getPublicKey()
    
    try
    {
       
        let decoded = jwt.verify(access, pub_key);
        
        let response = await fetch( API_HOST + URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization" : "Bearer "+access
            },
        })
        response = await response.json()
     
        try
        {
                let decoded = jwt.verify(response,pub_key);
                return decoded.data
        }
        catch(e)
        {
            throw "SERVER-RELIABILITY-ERROR"
        }

        
    }
    catch(e)
    {
        // can it be Refreshed ? 
         await RefreshTokens();
         // checking if it's connected again 
        if( isConnected())
            AuthentifiedFetch(URL)
        else 
            window.location="/"
    }
    
    

} 
