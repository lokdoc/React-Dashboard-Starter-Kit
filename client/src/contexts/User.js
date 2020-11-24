import {createContext,useState} from 'react'
var jwt = require('jsonwebtoken');


// Initializing and exporting User's context 
export const UserContext = createContext()

// Initializing and exporting context provider 


export const UserContextProvider =  (props) =>
{
    

    // Initializing user status 

    let INIT_USER = { isConnected : false }

    // Checking if there is traces of old authentification

    let LocalToken = localStorage.getItem("token");
    let ServerKey  = localStorage.getItem("pub_key");
    
    // if a token found 
    if( LocalToken && ServerKey )
    {
        // decoding token to init user's state 
        INIT_USER = jwt.verify(LocalToken, ServerKey);
        INIT_USER.isConnected = true

    } 

    // Intializing user's state 

    const [user, setUser] = useState(INIT_USER)

    function EditUser(val)
    {
        setUser(val)
    }

    return (
        <UserContext.Provider value={{user,setUser,EditUser}}>
            {props.children}
        </UserContext.Provider>
    )
}



