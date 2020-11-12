import React, { useState } from "react";
import "./login.css";
import { Redirect } from "react-router-dom";


function Login()
{
  const [isConnected, setConnected] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  let login = function(e)
  {
 
          if (username === "admin" && password === "admin") 
          {
              localStorage.setItem("token", "T");
              setConnected(true)
          }
          localStorage.setItem("token", "T");
          setConnected(true)
          
          e.preventDefault();
  };
  

  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">


        <div className="login_container">

          <form onSubmit={login}>

              <h1>Authentification</h1>
      

                <div className="field">
                    <label>Username</label><br/>
                    <input
                      type="text"
                      name="username"
                      onChange={setUsername}
                      placeholder="Enter Username"
                    />

                </div>

                <div className="field">
                      <label>Mot de pass</label><br/>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Enter Password"
                      />
                </div>
            
            <input className="btn" type="submit" value="CONNEXION"/>

<br/>
<br/>
<br/>
          </form>
        </div>
    </div>
  );
}

export default Login;