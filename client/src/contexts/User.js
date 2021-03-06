import {createContext,useState,useEffect} from 'react'
var jwt = require('jsonwebtoken');
import { isConnected,getUserType,RefreshTokens } from "../utils/Verify"
import AuthentifiedFetch from "../utils/AuthentifiedFetch"
// Defining Instance user status 
var USER_STATUS = { isConnected : false }

// Initializing and exporting User's context 
export const UserContext = createContext()







// Initializing and exporting context provider 
export const UserContextProvider =  (props) =>
{ 
    
    const [user, setUser] = useState(USER_STATUS)
    

    async function UpdateUserStates()
    {
        console.log("Update User State Triggred")
        let connected = isConnected();
        if(connected)
        {
            setUser( { 
           
                isConnected:isConnected(),
                type : getUserType()
            })
           
            try
            {
                let payload = await AuthentifiedFetch("/profile");
                setUser({...payload.data, isConnected : true})
                console.log("Profile Loaded")

            }
            catch(e)
            {
                console.log("Failed to load profile")
            }
        }

       USER_STATUS = user; 
    }

    useEffect( async () =>
    {
        console.log("Effect Context Triggred ")
        await UpdateUserStates();

    }, [])


    
    return (
        <UserContext.Provider value={{user,setUser,UpdateUserStates}}>
            {props.children}
        </UserContext.Provider>
    )
}



