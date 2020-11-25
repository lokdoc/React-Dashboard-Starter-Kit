import React, { useState , useContext, useEffect} from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import * as SVGLoaders from 'svg-loaders-react';
import "./dashboard.css";

import Home from './Home/Home'
import { UserContext} from "../../contexts/User";

import AuthentifiedFetch from "../../utils/AuthentifiedFetch"

import { Bars,Audio, } from 'svg-loaders-react'

// Views Loading 
import UsersList from '../usersList/UsersList'
import Profile from '../Profile/Profile'
import { Bar } from "react-chartjs-2";
import { getUserType } from "../../utils/Verify";


function NotFound()
{
    return(
        <div>
            <h1> 404 Page</h1>
        </div>
    )
}

export default function()
{

  const [islogout, setLogout] = useState(false)
  const { user,setUser} = useContext(UserContext)

  let match = {path:"/dashboard"}



    let  signOut = () => 
    {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      setUser({isConnected:false})
      setLogout(true)
    };


    if (!user.isConnected) 
    {
      return <Redirect to="/login" />;
    }


    return (

      <div className="dashboard">

{/*
          // This is the next perspective of Navigation Bar Component 
          // Two levels :  menus and actions   


          <NavBar username=""> 

            <Menu label="Home" path="/dashboard" icon="/icons/home.svg" />

            <Menu visible={user.type=="admin"} label="Users List" path="/dashboard/users" >
                <Action label="Add User" onClick={}/>
            </Menu>
              
          
          </NavBar>

*/}

        <div className="navbar">
          <ul>
            <Link to={`${match.path}`}>
              <li className="brand">
                <img src="/icons/home.svg" height="35"/>
              </li>
            </Link>
          
            <Link to={`${match.path}`}>
              <li className="btn"> 
                  Home
              </li>
            </Link>
      

          {user.type == "admin" ? 
          (
            <Link to={`${match.path}/users`}>
              <li className="btn">
                  Users Management
              </li>
            </Link>
          ):null}
           
          <li className="push-right">
          <div className="dropdown">
          <button className="dropbtn">{user.lastname}  {user.firstname} <b>[ {user.type} ]</b></button>
                <div className="dropdown-content">
               
                <Link to={`${match.path}/profile`}>My Account</Link>
                <a href="#" onClick={signOut}>Sign Out</a>

                </div>
              </div>

               
          </li>
        </ul>

        </div>
       
       
       
        <main role="main">
          <div className="main">

                <Switch>
                  <Route path={`${match.path}/profile`}>
                    <Profile />
                  </Route>

                  <Route path={`${match.path}/users`}>
                    <UsersList />
                  </Route>
                  <Route exact path={`${match.path}`}>
                    
                  <Home/>
                  </Route>
                  <Route path="*">
                  <NotFound />   
                  </Route>
                </Switch>
          </div>
        </main>
      </div>
    );
}

