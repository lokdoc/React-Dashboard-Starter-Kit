import React, { useState } from "react";
const validator = require('validator');

import "./register.css";
import { Link, Redirect } from "react-router-dom";
import {UserContext,UserContextProvider } from "../../contexts/User"
import InputField from "../../components/InputField/InputField";


export default function()
{

  const [firstname, setFirstname] = useState("");
  const [lastname,  setLastname]  = useState("");
  const [email,     setEmail]     = useState("");
  const [username,  setUsername]  = useState("");
  const [password,  setPassword]  = useState("");

  
  const register_action = function(e)
  {
     
     /*
      - Validation happen here 
      - Why ? 
      - in order to show errors to the user and allow him to correct them :)
     */
    

    
    e.preventDefault();
  }


  if (localStorage.getItem("token")) 
  {
      return <Redirect to="/" />;
  }

  return (
    <div className="container">


        <div className="register_container">

          <form onSubmit={register_action} autoComplete="off">

              <h1>Register</h1>
            
              <InputField  required={true} onChange={setUsername}   validation="username" label="Username" type="text"/> 
              <InputField  required={true} onChange={setPassword}   label="Password" type="password"/>

              <InputField  onChange={setEmail}      validation="email"  label="Email" type="text"/>
              <InputField  onChange={setFirstname}  label="First Name" type="text"/>
              <InputField  onChange={setLastname}   label="Last Name" type="text"/>
              
             
              <br/>
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
