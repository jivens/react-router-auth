import React from "react";
import { Link } from 'react-router-dom';
import logoImg from "../img/logo.jpg";
import { Logo, Card } from '../components/AuthForm'
import { Button, Input } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

let signupSchema = Yup.object().shape({
  first: Yup.string()
    .required('Required'),
  last: Yup.string()
    .required('Required'),
  username: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Password must be more than 2 characters')
    .max(30, 'Password must be less than 30 characters')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required!')
  });


function Signup() {
  return (
    <Card>
      <Logo src={logoImg} />
      <Formik 
        initialValues={{ 

          email: '', 
          password: '', 
          passwordConfirmation: ''}}
        validationSchema={signupSchema}
        >
        {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
          <Form>
             <Input
                fluid
                icon="write"
                iconPosition="left"
                id="first"
                placeholder="First Name"
                type="text"
                value={ values.first }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.first && touched.first ? 'text-input error' : 'text-input' }
              />
             {errors.first && touched.first && ( <div className="input-feedback">{errors.first}</div>
              )}
              <Input
                fluid
                icon="write"
                iconPosition="left"
                id="last"
                placeholder="Last Name"
                type="text"
                value={ values.last }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.last && touched.last ? 'text-input error' : 'text-input' }
              />
             {errors.last && touched.last && ( <div className="input-feedback">{errors.last}</div>
              )}
              <Input
                fluid
                icon="user"
                iconPosition="left"
                id="username"
                placeholder="Username"
                type="text"
                value={ values.username }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.username && touched.username ? 'text-input error' : 'text-input' }
              />
             {errors.user && touched.user && ( <div className="input-feedback">{errors.user}</div>
              )}
              <Input
                fluid
                icon="mail"
                iconPosition="left"
                id="email"
                placeholder="email"
                type="text"
                value={ values.email }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.email && touched.email ? 'text-input error' : 'text-input'}
              />
             {errors.email && touched.email && ( <div className="input-feedback">{errors.email}</div>
              )}
              <Input
                fluid
                icon='lock'
                iconPosition='left'
                id="password"
                placeholder="Password"
                type="password"
                value={ values.password }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.password && touched.password ? 'text-input error' : 'text-input' }
              />
             {errors.password && touched.password && ( <div className="input-feedback">{errors.password}</div>
              )}
              <Input
                fluid
                icon='lock'
                iconPosition='left'
                id="passwordConfirmation"
                placeholder="Confirm your password"
                type="password"
                value={ values.passwordConfirmation }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.passwordConfirmation && touched.passwordConfirmation ? 'text-input error' : 'text-input' }
              />
             {errors.passwordConfirmation && touched.passwordConfirmation && ( <div className="input-feedback">{errors.passwordConfirmation}</div>
              )}
              <Button color="blue" size="large" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
          </Form>
          )}
        </Formik>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default Signup;