
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
//import axios from 'axios';
import logoImg from "../img/logo.jpg";
import { Logo, Error } from "../components/AuthForm";
import { Grid, Button, Input, Segment, Message } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAuth } from "../context/auth";
import { gql } from 'apollo-boost';
import { handleErrors, broadCastError } from '../utils/messages';


function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const { client, setAuthTokens } = useAuth();

  const referer = (props.location && props.location.state && props.location.state.referer) ? props.location.state.referer : '/';

  const getUserToken = gql`
    query($email: String!, $password: String!) {
      loginUser_Q(email: $email, password: $password) {
        password
      }
    }
  `;



  async function postLogin() {
    try {
      let tokenQuery = await client.query({
        query: getUserToken,
        variables: {
          email: email,
          password: password
        },
        errorPolicy: 'all'
      })
      if (!tokenQuery.data.loginUser_Q) {
        broadCastError(`Username or Password is incorrect`) 
        setIsError(true)
      }
      else {
        const token = tokenQuery.data.loginUser_Q[0].password
        localStorage.setItem("tokens", JSON.stringify(token));
        setAuthTokens(token)
        setLoggedIn(true)
      }
    } 
    catch(e) {
      handleErrors(e)
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

  let loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Required'),
    password: Yup.string()
      .required('Required'),
  });

  if (isLoggedIn) {
    return <Redirect to={referer} />;
    //return <Redirect to="/" />;
  }

  return (
   <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Logo src={logoImg} />
        <Formik 
          initialValues={{ 
            email: '', 
            password: '', 
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            postLogin(values, setSubmitting);
          }}
          >
          {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Segment stacked>
                <Input
                  fluid
                  style={{ paddingBottom: '5px' }}
                  icon="mail"
                  iconPosition="left"
                  id="email"
                  placeholder="email"
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                    handleChange(e)
                  }}
                  onBlur={ handleBlur }
                  className={ errors.email && touched.email ? 'text-input error' : 'text-input'}
                />
               {errors.email && touched.email && ( <div className="input-feedback">{errors.email}</div>
                )}
                <Input
                  fluid
                  style={{ paddingBottom: '5px' }}
                  icon='lock'
                  iconPosition='left'
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                    handleChange(e)
                  }}
                  onBlur={ handleBlur }
                  className={ errors.password && touched.password ? 'text-input error' : 'text-input' }
                />
               {errors.password && touched.password && ( <div className="input-feedback">{errors.password}</div>
                )}
                  <Button 
                    fluid
                    color="blue" 
                    size="large" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                </Segment>
            </Form>
            )}
          </Formik>
          <Message>
            <Link to="/signup">Don't have an account?</Link>
            { isError &&<Error>The username or password provided were incorrect!</Error> }
          </Message>
      </Grid.Column>
      </Grid>
  );
}

export default Login;