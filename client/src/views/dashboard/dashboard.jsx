import React, { useState , useContext, useEffect} from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import * as SVGLoaders from 'svg-loaders-react';
import "./dashboard.css";

import Home from './Home/Home'
import { UserContext, UserContextProvider} from "../../contexts/User";

import AuthentifiedFetch from "../../utils/AuthentifiedFetch"

import { Bars,Audio, } from 'svg-loaders-react'

// Views Loading 
import UsersList from '../usersList/UsersList'
import Profile from '../Profile/Profile'
import { Bar } from "react-chartjs-2";


//import Master from "./Master";
//import Pos from "./Pos";
//import IndexDashboard from "./IndexDashboard";
//import NotFound from "./404";




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
  
  let match = {path:"/dashboard"}

  let  signOut = () => 
  {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    setLogout(true)
  };



    if (islogout) 
    {
      return <Redirect to="/login" />;
    }


    return (

      <div className="dashboard">

        <div className="navbar">

       
        <ul>

          <li className="brand">
            <Link to={`${match.path}`}>

          <img src="/icons/home.svg" height="35"/>
            </Link>
          </li>

          <li className="btn">
            <Link to={`${match.path}`}>Home</Link>
          </li>
          <li className="btn">
            <Link to={`${match.path}/users`}>Users Management</Link>
          </li>
          
          <li className="push-right">
          <div className="dropdown">
          <button className="dropbtn">BELAHDA LOKMENE <b>[ ADMIN ]</b></button>
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

