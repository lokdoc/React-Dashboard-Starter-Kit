import React, { useEffect,useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { isConnected,RefreshTokens } from "../utils/Verify"



const ProtectedRoute = ({ children, ...rest }) => {

  const [connected, setConnected ] = useState(true)
  
  useEffect(async ()=>
  {
    await RefreshTokens();
    let current  = isConnected()
    setConnected(current)


  },[])

  return (
    
    <Route
      {...rest}
      render={({ location }) =>
      {
      

       
        if(connected)
        {
            return (children)
        }
        else
        {

          return (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: location }
                    }}
                  />
          )
        }

      }
         
      }
    />
  );
};
export default ProtectedRoute;