import React, { useState,useContext} from "react";
import "./login.css";
import { Link, Redirect ,useHistory} from "react-router-dom";
import {UserContext} from "../../contexts/User";
import InputField from "../../components/InputField/InputField";
import MessageBox from "../../components/MessageBox/MessageBox";
import { VerifyToken, getPublicKey, isConnected } from "../../utils/Verify"


const config = require("../../config.json")

const API_HOST = config.host + ":" + config.port 

const loginUser = async (username, password , callback )=>
{

    const requestOptions = 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ user: username, pass: password })
    };
    
    
    try
    {

        let response  = await fetch( API_HOST + "/login", requestOptions) ;
      
        if( response.status == 200)
        {
            response = await response.json();
            let access  = await VerifyToken(response["access-token"])
            let refresh = await VerifyToken(response["refresh-token"])

            if(access && refresh)
            {
              
                localStorage.setItem("access-token" ,response["access-token"])
                localStorage.setItem("refresh-token" ,response["refresh-token"])

                callback(null)
            }
        
        }
        if( response.status == 401)
        {
            if(callback)
                callback("ERROR-LOGIN")
        }
      

    }
    catch(err)
    {
        console.log(err)
        // If an error encontred, sending to callback of errors to handle UI 
        if(callback)
            callback("SERVER-ERROR")
    }
      

}


export default function ()
{
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const [errMessage, setErrMessage] = useState("")
  const [modalIsOpen,setIsOpen] = React.useState(false);

  const {user,setUser,UpdateUserStates} = useContext(UserContext)
  
  let History = useHistory()

  if (user.isConnected) 
  {
      return <Redirect to="/dashboard" />;
  }
  return (
    <div className="container">


        <div className="login_container">

          <form autoComplete="chrome-off" onSubmit={(e)=>{

           
            e.preventDefault();

            loginUser(username,password, function(err)
            {
             
              if(!err)
              {
                  setUser({isConnected:true})
                  UpdateUserStates()

              }
              else
              {
                setErrMessage(err)
                // Shows the Error Dialog 
                setIsOpen(true);
           
              }
             
            })


           

          }}>

              <h1>Sign in</h1>
      
            


              <InputField id="t_user" label="Username" onChange={setUsername}/>

            
              <InputField id="t_pass" label="Password" onChange={setPassword} type="password"/>
              <br/>
              <br/>
                
            <input className="btn" type="submit" value="LOGIN"/>
            <br/> <br/>
            <span >Dont have an account ?  <Link to={`/register`}>Register now</Link> </span>
        <br/>
        <br/>
        <br/>


          </form>

        </div>



          <MessageBox 
            isOpen={modalIsOpen}
            title="Login Information"
            icon="/icons/error.svg"
            HeaderColor="brown"
            onClose={()=>setIsOpen(false)}
         >
           <h1>Sorry...</h1>
           <p>
              Either your <b>username</b> or your <b>password </b> is incorrect. <br/>
              This may be due to a misspelling, your <b>Caps Lock </b> may be on, <br/>
              the  password may have expired, or the domain may be required. <br/>
              <b>To continue</b>, please retype your username and password.
           </p>

           </MessageBox>
           
      

    </div>
  );
}
