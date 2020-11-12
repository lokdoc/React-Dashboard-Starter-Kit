import React, { useState } from "react";
import "./login.css";
import { Link, Redirect } from "react-router-dom";
import TextField from "../../components/TextField/TextField"

function Login()
{
  const [isConnected, setConnected] = useState(false)
  const [username, setUsername] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")


  let login = function(e)
  {
    
          if (username === "admin" && password === "admin") 
          {
              localStorage.setItem("token", "T");
              setConnected(true)
          }
         
          
          e.preventDefault();
  };
  

  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">


        <div className="login_container">

          <form onSubmit={login}>

              <h1>Sign in</h1>
      

              <TextField label="Username"  onChange={setUsername}/>
              <TextField label="Password" onChange={setPassword} type="password"/>
              <br/>
                
            <input className="btn" type="submit" value="LOGIN"/>
            <br/> <br/>
            <span >Dont have an account ?  <Link to={`/register`}>Register now</Link> </span>
        <br/>
        <br/>
        <br/>

          </form>
        </div>
    </div>
  );
}

export default Login;