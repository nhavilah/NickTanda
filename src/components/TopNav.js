import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import SignUp from "../pages/Signup";
import CreateOrganisation from "../pages/CreateOrganisation";
import ListOrganisation from "../pages/ListOrganisation";
import UpdateOrganisation from "../pages/UpdateOrganisation";
import UpdateShifts from "../pages/UpdateShifts";
import CreateShifts from "../pages/CreateShifts";
import ListShifts from "../pages/ListShifts";
import ListUsers from "../pages/ListUsers";
import UserInfo from "../pages/UserInfo";

function TopNav() {
  return (
    <>
      <Router>
        <nav>
          <Link to="/signup">
            <button>
              <h3>Sign Up</h3>
            </button>
          </Link>
          <Link to="/login">
            <button>
              <h3>Login</h3>
            </button>
          </Link>
          <Link to="/logout">
            <button>
              <h3>Logout</h3>
            </button>
          </Link>
          <Link to="/createorganisation">
            <button>
              <h3>Create Organisation</h3>
            </button>
          </Link>
          <Link to="/listorganisation">
            <button>
              <h3>List Organisation</h3>
            </button>
          </Link>
          <Link to="/createshift">
            <button>
              <h3>Create Shifts</h3>
            </button>
          </Link>
          <Link to="/listshifts">
            <button>
              <h3>List Shifts</h3>
            </button>
          </Link>
          <Link to="/listusers">
            <button>
              <h3>List Users</h3>
            </button>
          </Link>
          <Link to="/me">
            <button>
              <h3>About Me</h3>
            </button>
          </Link>
        </nav>
        <Switch>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/createorganisation">
            <CreateOrganisation />
          </Route>
          <Route path="/listorganisation">
            <ListOrganisation />
          </Route>
          <Route path="/updateorganisation">
            <UpdateOrganisation />
          </Route>
          <Route path="/listshifts">
            <ListShifts />
          </Route>
          <Route path="/createshift">
            <CreateShifts />
          </Route>
          <Route path="/updateshifts">
            <UpdateShifts />
          </Route>
          <Route path="/listusers">
            <ListUsers />
          </Route>
          <Route path="/me">
            <UserInfo />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default TopNav;
