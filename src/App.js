import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { gql } from 'apollo-boost';
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import { AuthContext } from "./context/auth";
import { ToastContainer } from 'react-toastify';
import { broadCastSuccess } from './utils/messages';
import NavBar from './components/NavBar'
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const existingUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(existingUser);
  
  const getUserFromToken = gql`
    query {
      getUserFromToken_Q {
        id
        username
        first
        last
        email
        roles
        password
      }
    }
`;

  const setTokens = async (data) => {
    if (!data) {
      localStorage.removeItem("tokens")
      localStorage.removeItem("user")
      setAuthTokens();
      setUser();
    }
    else {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
      let userQuery = await props.client.query({
        query: getUserFromToken,
        errorPolicy: 'all'
      })
      localStorage.setItem("user", JSON.stringify(userQuery.data.getUserFromToken_Q))
      setUser(userQuery.data.getUserFromToken_Q)
      broadCastSuccess(`Successfully logged in as: ${userQuery.data.getUserFromToken_Q.username}`)
    }
  }

  return (
    <AuthContext.Provider value={{ client: props.client, user, authTokens, setAuthTokens: setTokens}}>
      <Router>
        <div>
          <NavBar>
            <ToastContainer key="ToastContainer"/>
            <ul key="OptionsList">
              <li key="HomeLi">
                <Link to="/" key="HomeLink">Home Page</Link>
              </li>
              <li key="AdminLi">
                <Link to="/admin" key="AdminLink">Admin Page</Link>
              </li>
            </ul>
            <Route exact path="/" component={Home} key="HomePage" />
            <Route path="/login" component={Login} key="LoginPage" />
            <Route path="/signup" component={Signup} key="SignupPage" />
            <PrivateRoute path="/admin" component={Admin} key="AdminPage" />
          </NavBar>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
