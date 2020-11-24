import React, { useState , useContext, useEffect} from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import * as SVGLoaders from 'svg-loaders-react';
import "./Profile.css";

import { UserContext, UserContextProvider} from "../../contexts/User";
import AuthentifiedFetch from "../../utils/AuthentifiedFetch"
import { Bars} from 'svg-loaders-react'
import InputField from "../../components/InputField/InputField";

export default function ()
{
  
  const [loading, setloading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(async ()=>
  {
    // Fetching User Data 

    let payload = await AuthentifiedFetch("/profile");
    setUser(payload.data)
    setloading(false)


  },[])


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
              <input type="button" value="Remove my account"/>
        </div>
    )
}
