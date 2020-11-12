import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./dashboard.css";
//import Master from "./Master";
//import Pos from "./Pos";
//import IndexDashboard from "./IndexDashboard";
//import NotFound from "./404";


function Master()
{
    return(
        <div>
            <h1> Maaster Page</h1>
        </div>
    )
}

function Pos()
{
    return(
        <div>
            <h1> POS Page</h1>
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
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false
    };
  }
  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };
  render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    const { match } = this.props;
    return (

      <div className="dashboard">
        <ul>

          <li className="brand">
            <Link to={`${match.path}`}>BDS</Link>
          </li>

          <li>
            <Link to={`${match.path}`}>Dashboard</Link>
          </li>
          <li>
            <Link to={`${match.path}/master`}>Master</Link>
          </li>
          <li>
            <Link to={`${match.path}/pos`}>Pos</Link>
          </li>
          
          <li className="push-right">

               <span  onClick={this.signOut}>
                   BELAHDA LOKMENE 
               </span>          
          </li>
        </ul>
        <main role="main">
          <div className="main">
            <Switch>
              <Route path={`${match.path}/master`}>
                <Master />
              </Route>
              <Route path={`${match.path}/pos`}>
                <Pos />
              </Route>
              <Route exact path={`${match.path}`}>
                
                { /* <IndexDashboard /> */}
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
}
 
export default withRouter(Dashboard);