import React, { useState , useContext, useEffect} from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import * as SVGLoaders from 'svg-loaders-react';
import "./Profile.css";

import {UserContext} from "../../contexts/User";
import AuthentifiedFetch from "../../utils/AuthentifiedFetch"
import { Bars} from 'svg-loaders-react'
import InputField from "../../components/InputField/InputField";
import MessageBox from '../../components/MessageBox/MessageBox'




export default function ()
{
  const [ msgBox, setMsgBox] = useState(false)
  const [loading, setloading] = useState(false)
  const { user ,setUser} = useContext(UserContext)


  async function RemoveUser(id)
  {
    let payload = await AuthentifiedFetch("/profile",{ remove : id });
  }


    if(loading)
    return(
      <div className="loading">
                   <Bars fill="brown" />
      </div>
    )
    else
    return(
       
        <div>
            <h1> My Account</h1>

              <InputField  disabled={true} value={user.username} label="Username"   type="text"/> 
              <InputField  disabled={true} value={user.email} label="Email"      type="text"/>
              <InputField  disabled={true} value={user.firstname} label="First Name" type="text"/>
              <InputField  disabled={true} value={user.lastname} label="Last Name"  type="text"/>

              <input type="button" value="Change Password"/>
              <input type="button" value="Remove my account" onClick={()=>
                {
                  setMsgBox(true)
                }}/>


          <MessageBox 
            isOpen={msgBox}
            title="Remove User"
            icon="/icons/error.svg"
            HeaderColor="brown"
            AcceptLabel="YES"
            CancelLabel="NO"

            onAccept={()=>{

              
              // Remove Account itself 

                
                  RemoveUser(user.id)
                  // signout 

                  localStorage.removeItem("access-token");
                  localStorage.removeItem("refresh-token");
                  setUser({isConnected:false})

                  setMsgBox(false)
              
            }}
            onClose={()=>setMsgBox(false)}
         >
           <h1>Warning</h1>
           <p style={{fontSize:16}}>
              Are you sure you want to remove your account ?  <br/>
              <h2> THIS ACTION IS NOT REVERSIBLE </h2>
           </p>

           </MessageBox> 
        </div>
    )
}
