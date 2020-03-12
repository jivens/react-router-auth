
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
//import axios from 'axios';
import logoImg from "../img/logo.jpg";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import { gql } from 'apollo-boost';
import { toast } from 'react-toastify';


function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { client, setAuthTokens } = useAuth();

  const referer = props.location.state.referer || '/';

  const getUserToken = gql`
    query($email: String!, $password: String!) {
      loginUser_Q(email: $email, password: $password) {
        password
      }
    }
  `;



  async function postLogin() {
    let tokenQuery = await client.query({
      query: getUserToken,
      variables: {
        email: userName,
        password: password
      },
      errorPolicy: 'all'
    })
    if (!tokenQuery.data.loginUser_Q) {
      toast.error(`Username or Password is incorrect`) 
      setIsError(true)
    }
    else {
      const token = tokenQuery.data.loginUser_Q[0].password
      localStorage.setItem("tokens", JSON.stringify(token));
      setAuthTokens(token)
      setLoggedIn(true)
    }

    // axios.post("http://localhost:4000/api", {
    //   userName,
    //   password
    // }).then(result => {
    //   if (result.status === 200) {
    //     setAuthTokens(result.data);
    //     setLoggedIn(true);
    //   } else {
    //     setIsError(true);
    //   }
    // }).catch(e => {
    //   setIsError(true);
    // });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
    //return <Redirect to="/" />;
  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
        { isError &&<Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Login;