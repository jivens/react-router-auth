import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { gql } from 'apollo-boost';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { getUserFromToken } from './queries/queries'
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';
import AddAffix from './pages/AddAffix';
import EditAffix from './pages/EditAffix';
import DeleteAffix from './pages/DeleteAffix';
import UserListContainer from './pages/UserListContainer';
import Testmutation from './pages/Testmutation';
import Affixes from './pages/Affixes';
import { AuthContext } from "./context/auth";
import { ToastContainer } from 'react-toastify';
import { broadCastSuccess } from './utils/messages';
import NavBar from './components/NavBar';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/react-hooks';

function App(props) {

  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const existingUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(existingUser);

  const client = new ApolloClient({
    link: new ApolloLink((operation, forward) => {
      const token = JSON.parse(localStorage.getItem('tokens'))
      console.log("Client--My token is:", token ? `Bearer ${token}` : '')
      operation.setContext(
        token ? {
        headers: {
          authorization: `Bearer ${token}`, 
        }} : {
          headers: {}
        });
      return forward(operation);
    }).concat(
      new HttpLink({
        uri: 'http://localhost:8080/v1/graphql',
      })
    ),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
  });

  const authClient = new ApolloClient({
    link: new ApolloLink((operation, forward) => {
      const token = JSON.parse(localStorage.getItem('tokens'))
      console.log("Auth--My token is:", token ? `Bearer ${token}` : '')
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '', 
        }
      });
      return forward(operation);
    }).concat(
      new HttpLink({
        uri: 'http://localhost:4000/api',
      })
    ),
    cache: new InMemoryCache(),
  });

  const setTokens = async (data) => {
    if (!data) {
      localStorage.removeItem("tokens")
      localStorage.removeItem("user")
      console.log("Setting the authorization tokens")
      setAuthTokens();
      console.log("Setting the user")
      setUser();
    }
    else {
      console.log("Setting the authorization tokens")
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
      console.log("Setting the user")
      let userQuery = await authClient.query({
        query: getUserFromToken,
        errorPolicy: 'all'
      })
      console.log(userQuery)
      let user = userQuery.data.getUserFromToken_Q
      let roles = []
      user.roles.forEach(role => roles.push(role.role_code))
      user.roles = roles
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
      broadCastSuccess(`Successfully logged in as: ${user.username}`)
    }
  }

  const NotFound = () => <div>Not found</div>
  const NotFoundRedirect = () => <Redirect to='/not-found' />

  return (
    <AuthContext.Provider value={{ client: client, authClient: authClient, user, setUser, authTokens, setAuthTokens: setTokens}}>
      {/* <ApolloProvider client = {client}> */}
      <Router>
        <div>
          <NavBar>
            <ToastContainer key="ToastContainer"/>
            <Switch>
              <Route exact path="/" component={Home} key="HomePage" />
              <Route path="/login" component={Login} key="LoginPage" />
              <Route path="/signup" component={Signup} key="SignupPage" />
              <Route path="/affixes" component={Affixes} key="Affixes" />
              <PrivateRoute path="/addaffix" component={AddAffix} key="AddAffix" />
              <PrivateRoute path="/editaffix" component={EditAffix} key="EditAffix" />
              <PrivateRoute path="/deleteaffix" component={DeleteAffix} key="DeleteAffix" />
              <PrivateRoute path="/users" component={Users} key="Users" />
              <PrivateRoute path="/admin" component={Admin} key="AdminPage" />
              <PrivateRoute path="/userprofile" component={UserProfile} key="UserProfile" />
              <PrivateRoute path="/userlist" component={UserListContainer} key="UserListContainer" />
              <Route path="/testmutation" component={Testmutation} key="TestmutationPage" />
              <Route path="/not-found" component={NotFound} key="NotFound" />
              <Route component={NotFoundRedirect} key="NotFoundRedirect" />
            </Switch>
          </NavBar>
        </div>
      </Router>
      {/* </ApolloProvider> */}
    </AuthContext.Provider>
  );
}

export default App;
