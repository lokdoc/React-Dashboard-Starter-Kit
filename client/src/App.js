import React from "react";
import "./App.css";
import Login from "./views/login/login";
import Dashboard from "./views/dashboard/dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./views/ProtectedRoute";
import Register from "./views/register/register";
import { UserContextProvider } from "./contexts/User";



export default function App() {
  return (
   
        <Router>

          <Switch>
        
              <Route path="/login">
                <UserContextProvider>
                      <Login />
                      </UserContextProvider>
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            

           
                <ProtectedRoute path="/dashboard">
                  <UserContextProvider>
                    <Dashboard />
                  </UserContextProvider>
                </ProtectedRoute>
        

            <Route exact path="/">
              <Redirect exact from="/" to="dashboard" />
            </Route>
            
            <Route path="*">
              <Redirect from="/" to="dashboard" />
            </Route>

        
          </Switch>
        </Router>
   
  );
}
