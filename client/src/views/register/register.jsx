import React, { useState } from "react";
import "./register.css";
import { Link, Redirect } from "react-router-dom";
import TextField from "../../components/TextField/TextField"

export default function()
{

  let register = function(e)
  {
    
          e.preventDefault();
  };
  

  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">


        <div className="login_container">

          <form onSubmit={register}>

              <h1>Register</h1>
      
             
              <TextField label="First Name" type="text"/>
              <TextField label="Last Name" type="text"/>
              <TextField label="Email" type="text"/>
              <TextField label="Username" type="text"/> 
              <TextField label="Password" type="password"/>
              <TextField label="Confirm Password" type="password"/>

              <br/>
                
            <input className="btn" type="submit" value="Register"/>
            <br/> 
            <br/>

            <span >You already have an account ?  <Link to={`/login`}>Login now</Link> </span>
        <br/>
        <br/>
        <br/>


          </form>
        </div>
    </div>
  );
}
