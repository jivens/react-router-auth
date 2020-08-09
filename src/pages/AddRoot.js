import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { insertRootMutation } from './../queries/queries'
import { Button, Input, Dropdown, Label, Grid, Header, Message } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAuth } from "../context/auth";
import { useQuery } from '@apollo/react-hooks'
import { handleErrors, broadCastSuccess } from '../utils/messages';
import { set } from "lodash";
import { confirmAlert } from 'react-confirm-alert';
import '../stylesheets/react-confirm-alert.css';

//TODO: change to root fields
let addRootSchema = Yup.object().shape({
  nicodemus: Yup.string()
    .required('a Nicodemus spelling is required'),
  english: Yup.string()
    .required('an English gloss is required'),
  editnote: Yup.string()
    .required('an edit note is required'),
  root: Yup.string()
    .required('a root is required'),   
  });


function AddRoot() {
  const { client } = useAuth();
  const [ hasUpdated, setHasUpdated] = useState(false)
  const history = useHistory()


  async function onFormSubmit (values, setSubmitting) {
    try {
      const result = await client.mutate({
        mutation: insertRootMutation,
        variables: {
          // id: values.id,
          // TODO: change to roots field
          root: values.root,
          nicodemus: values.nicodemus,
          english: values.english,
          cognate: values.cognate,
          editnote: values.editnote,
        }
      })
      if (result.error) {
        handleErrors(result.error)
        setSubmitting(false)
      } else {
        broadCastSuccess(`root ${values.root} successfully added!`)
        setSubmitting(false)
        setHasUpdated(true)
      }
    } catch (error) {
      handleErrors(error)
      setSubmitting(false)
    }
  }

  if (hasUpdated) {
    return <Redirect to="/roots" />;
  }


  const routeChange=()=> {
    let path = `/roots`;
    history.push(path);
  }

  return (
    <>
    <Grid centered>
        <Grid.Row>
            <Grid.Column textAlign="center" width={12}>
                <Header as="h2">Add a Root</Header>
                <Message>The elements whose labels are solid blue are required for all roots.  The elements whose labels are outlined may be blank.</Message>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    <Formik 
        initialValues={{ 
        id: null,
        root: '',
        nicodemus: '',
        cognate: '',
        salish: '' ,
        english: '', 
        editnote: '' 
        }}
        validationSchema={addRootSchema}
        onSubmit={(values, { setSubmitting }) => {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure you want to add the root?',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => onFormSubmit(values, setSubmitting)
                  },
                  {
                    label: 'No',
                    onClick: () => {values = values
                                    setSubmitting(false)}
                  }
                ]
              });
        }}>
        
        {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
        <Form>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Root</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="root"
                            placeholder="Root"
                            type="text"
                            value={ values.root }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.root && touched.root ? 'text-input error' : 'text-input' }
                        />
                        {errors.nicodemus && touched.nicodemus && ( <div className="input-feedback">{errors.nicodemus}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Nicodemus</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="nicodemus"
                            placeholder="Nicodemus"
                            type="text"
                            value={ values.nicodemus }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.nicodemus && touched.nicodemus ? 'text-input error' : 'text-input' }
                        />
                        {errors.nicodemus && touched.nicodemus && ( <div className="input-feedback">{errors.nicodemus}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" basic color="blue">Salish</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="salish"
                            placeholder="Salish"
                            type="text"
                            value={ values.salish }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.salish && touched.salish ? 'text-input error' : 'text-input' }
                        />
                        {errors.salish && touched.salish && ( <div className="input-feedback">{errors.salish}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">English</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="english"
                            placeholder="english"
                            type="text"
                            value={ values.english }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.english && touched.english ? 'text-input error' : 'text-input'}
                        />
                        {errors.english && touched.english && ( <div className="input-feedback">{errors.english}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label basic pointing="right" color="blue">Cognate</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="cognate"
                            placeholder="cognate"
                            type="text"
                            value={ values.cognate }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.cognate && touched.cognate ? 'text-input error' : 'text-input' }
                        />
                        {errors.link && touched.link && ( <div className="input-feedback">{errors.link}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} textAlign="right"><Label pointing="right" color="blue">Edit Note</Label></Grid.Column>
                    <Grid.Column width={10}>
                        <Input
                            fluid
                            style={{ paddingBottom: '5px' }}
                            id="editnote"
                            placeholder="editnote"
                            type="text"
                            value={ values.editnote }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.nicodemus && touched.nicodemus ? 'text-input error' : 'text-input' }
                        />
                        {errors.nicodemus && touched.nicodemus && ( <div className="input-feedback">{errors.nicodemus}</div>
                        )}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Button 
                            fluid
                            color="blue"  
                            type="submit" 
                            disabled={isSubmitting}
                        >
                            Submit
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button onClick={routeChange}
                            fluid
                        >
                            Cancel
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
         )}
    </Formik>
    </>
  );
}

export default AddRoot;