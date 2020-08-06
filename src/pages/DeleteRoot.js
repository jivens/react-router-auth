import React, { useState } from "react";
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { getRootByIdQuery, deleteRootMutation } from '../queries/queries'
import { Button, Input, Dropdown, Label, Grid, Header, Message } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAuth } from "../context/auth";
import { useQuery } from '@apollo/react-hooks'
import { handleErrors, broadCastSuccess } from '../utils/messages';
import { confirmAlert } from 'react-confirm-alert';
import '../stylesheets/react-confirm-alert.css';

let deleteRootSchema = Yup.object().shape({
    editnote: Yup.string()
      .required('an edit note is required'), 
    });

function DeleteAffix() {
  const { client } = useAuth();
  const [ hasUpdated, setHasUpdated ] = useState(false)
  const search = new URLSearchParams(useLocation().search)
  const id = search.get("id")
  const history = useHistory()


  let { loading: rootLoading, error: rootError, data: rootData } = useQuery(getRootByIdQuery, {client: client, variables: {id: id} }) 

  if (rootLoading) {
      return <div>loading...</div>
  }
  if (rootError) {
      return <div>Something went wrong</div>
  }

  async function onFormSubmit (values, setSubmitting) {
    try {
      const result = await client.mutate({
        mutation: deleteRootMutation,
        variables: {
          id: values.id,
          editnote: values.editnote
        }
      })
      if (result.error) {
        handleErrors(result.error)
        setSubmitting(false)
      } else {
        broadCastSuccess(`root ${values.root} successfully removed!`)
        setSubmitting(false)
        setHasUpdated(true)
      }
    } catch (error) {
      handleErrors(error)
      setSubmitting(false)
    }
  }

  if (hasUpdated) {
    return <Redirect to="/affixes" />;
  }

//   function dropDownOptions(options) {
//       let res = []
//       options.map((item) => {
//           let h = {}
//           h = { 
//               key: item.id.toString(),
//               value: item.id.toString(),
//               text: item.value          
//           }
//           res.push(h)
//       })
//       return res
//   }

  const routeChange=()=> {
    let path = `/affixes`;
    history.push(path);
  }

  return (
    <>
    <Grid centered>
        <Grid.Row>
            <Grid.Column textAlign="center" width={12}>
                <Header as="h2">Remove an Affix</Header>
                <Message>Submitting this form marks the affix as inactive. You must enter a note to proceed.</Message>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    <Formik 
        initialValues={{ 
            id: rootData.roots_by_pk.id,
            root: rootData.roots_by_pk.root,
            nicodemus: rootData.roots_by_pk.nicodemus,
            salish: rootData.roots_by_pk.salish ? rootData.roots_by_pk.salish : "" ,
            english: rootData.roots_by_pk.english, 
            cognate: rootData.roots_by_pk.cognate ? rootData.roots_by_pk.salish : "",
            editnote: rootData.roots_by_pk.editnote ? rootData.roots_by_pk.editnote : "" 
        }}
        validationSchema={deleteRootSchema}
        onSubmit={(values, { setSubmitting }) => {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure you want to delete the root?',
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
        }}
        >
        {({ isSubmitting, values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
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
                        {errors.root && touched.root && ( <div className="input-feedback">{errors.root}</div>
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
                            placeholder="An edit note is required"
                            type="text"
                            value={ values.editnote }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            className={ errors.editnote && touched.editnote ? 'text-input error' : 'text-input' }
                        />
                        {errors.editnote && touched.editnote && ( <div className="input-feedback">{errors.editnote}</div>
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

export default DeleteAffix;