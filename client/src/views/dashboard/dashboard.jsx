import React, { useState } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./dashboard.css";

import Home from './Home/Home'


//import Master from "./Master";
//import Pos from "./Pos";
//import IndexDashboard from "./IndexDashboard";
//import NotFound from "./404";



function MyAccount()
{
    return(
        <div>
            <h1> My Account</h1>
        </div>
    )
}

function Users()
{
    return(
        <div>
            <h1> Users Management </h1>
        </div>
    )
}

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
    localStorage.removeItem("token");
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
               
                <Link to={`${match.path}/account`}>My Account</Link>
                <a href="#" onClick={signOut}>Sign Out</a>

                </div>
              </div>

               
          </li>
        </ul>

        </div>
        <main role="main">
          <div className="main">
            <Switch>
              <Route path={`${match.path}/account`}>
                <MyAccount />
              </Route>

              <Route path={`${match.path}/users`}>
                <Users />
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

