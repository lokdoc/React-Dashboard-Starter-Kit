import React, { useState } from "react";
import "./register.css";
import { Link, Redirect,useHistory } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { VerifyToken, getPublicKey, isConnected } from "../../utils/Verify"
const config = require("../../config.json")



const API_HOST = config.host + ":" + config.port 

export default function()
{

  const [firstname, setFirstname] = useState("");
  const [lastname,  setLastname]  = useState("");
  const [email,     setEmail]     = useState("");
  const [username,  setUsername]  = useState("");
  const [password,  setPassword]  = useState("");
  const  History = useHistory()
  
  const register_action = async function(e)
  {
    e.preventDefault();
     
     /*
      - Validation happen here 
      - Why ? 
      - in order to show errors to the user and allow him to correct them :)
     */
    let form = 
    { 
      username : username,
      password : password,
      firstname : firstname,
      lastname  : lastname,
      email : email
    }
       
     try
     {
      const requestOptions = 
      {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(form)
      };
    
    let response  = await fetch( API_HOST + "/register", requestOptions) ;
      
        if( response.status == 200)
        {
            response = await response.json();
            let access  = await VerifyToken(response["access-token"])
            let refresh = await VerifyToken(response["refresh-token"])

            if(access && refresh)
            {
              
              console.log(access)
                localStorage.setItem("access-token" ,response["access-token"])
                localStorage.setItem("refresh-token" ,response["refresh-token"])

                History.push("/")
            }
        
        }
        if( response.status == 403)
        {
           alert("USER-EXISTS")
        }
      

    }
    catch(err)
    {
        console.log(err)
        // If an error encontred, sending to callback of errors to handle UI 
        alert("SERVER-ERROR")
    }

   
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
            
              <InputField  onChange={setUsername}   label="Username"  validation="username"required={true} /> 
              <InputField  onChange={setPassword}   label="Password"  type="password" required={true} />

              <InputField  onChange={setEmail}      label="Email"     validation="email" errorMessage="Please enter correct email format" />
              <InputField  onChange={setFirstname}  label="First Name" />
              <InputField  onChange={setLastname}   label="Last Name" />
              
             
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
