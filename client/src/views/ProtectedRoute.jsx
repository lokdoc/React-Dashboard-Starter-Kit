import React, { useEffect,useState,useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { isConnected,RefreshTokens } from "../utils/Verify"
import { UserContext} from "../contexts/User";


const ProtectedRoute = ({ children, ...rest }) => {

  const [connected, setConnected ] = useState(false)
  const { user} = useContext(UserContext)


  return (

    <Route
      {...rest}
      render={({ location }) =>
      {
      
        if(user.isConnected)
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