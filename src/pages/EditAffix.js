import React, { useState } from "react";
import { Redirect, useLocation } from 'react-router-dom';
import { getAffixByIdQuery, updateAffixMutation, getAffixTypesQuery } from './../queries/queries'
import { Button, Input } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAuth } from "../context/auth";
import { useQuery } from '@apollo/react-hooks'
import { handleErrors, broadCastSuccess } from '../utils/messages';


let updateAffixSchema = Yup.object().shape({
  editnote: Yup.string()
    .required('an edit note is required'),
  type: Yup.string()
    .required('you must select a type'),   
  });


function EditAffix(props) {
  const { client } = useAuth();
  const [ hasUpdated, setHasUpdated] = useState(false)
  const search = new URLSearchParams(useLocation().search)
  //console.log(search.get("id"))
  const id = search.get("id")


  let { loading: affixLoading, error: affixError, data: affixData } = useQuery(getAffixByIdQuery, {client: client, variables: {id: id} }) 
  let { loading: typeLoading, error: typeError, data: typeData } = useQuery(getAffixTypesQuery, {client: client }) 
   
  if (affixLoading || typeLoading) {
      return <div>loading...</div>
  }
  if (affixError || typeError) {
      return <div>Something went wrong</div>
  }

  async function onFormSubmit (values, setSubmitting) {
    try {
      const result = await client.mutate({
        mutation: updateAffixMutation,
        variables: {
          id: values.id,
          type: parseInt(values.type),
          nicodemus: values.nicodemus,
          salish: values.salish,
          english: values.english,
          editnote: values.editnote,
          link: values.link,
          page: values.page
        }
      })
      if (result.error) {
        handleErrors(result.error)
        setSubmitting(false)
      } else {
        broadCastSuccess(`affix ${values.nicodemus} successfully edited!`)
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

  return (
    <Formik 
        initialValues={{ 
        id: affixData.affixes_by_pk.id,
        type: affixData.affixes_by_pk.affix_type.id,
        nicodemus: affixData.affixes_by_pk.nicodemus,
        salish: affixData.affixes_by_pk.salish,
        english: affixData.affixes_by_pk.english, 
        link: affixData.affixes_by_pk.link,
        page: affixData.affixes_by_pk.page,
        editnote: affixData.affixes_by_pk.editnote
        }}
        validationSchema={updateAffixSchema}
        onSubmit={(values, { setSubmitting }) => {
        onFormSubmit(values, setSubmitting);
        }}
        >
        {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
        <Form>
            <select
                name="type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ display: 'block' }}
            >
                <option value="" label="Select a type" />
                { typeData.affix_types.map((item) => {
                    return <option value={item.id.toString()} label={item.value} key={item.id.toString()}/>
                })}
            </select>
            {errors.type &&
                touched.type &&
                <div className="input-feedback">
                {errors.type}
                </div>}
            <Input
                fluid
                style={{ paddingBottom: '5px' }}
                icon="write"
                iconPosition="left"
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
            <Input
                fluid
                style={{ paddingBottom: '5px' }}
                icon="write"
                iconPosition="left"
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
            <Input
                fluid
                style={{ paddingBottom: '5px' }}
                icon="write"
                iconPosition="left"
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
            <Input
                fluid
                style={{ paddingBottom: '5px' }}
                icon='write'
                iconPosition='left'
                id="link"
                placeholder="URL"
                type="text"
                value={ values.link }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.link && touched.link ? 'text-input error' : 'text-input' }
            />
            {errors.link && touched.link && ( <div className="input-feedback">{errors.link}</div>
            )}
            <Input
                fluid
                style={{ paddingBottom: '5px' }}
                icon='write'
                iconPosition='left'
                id="page"
                placeholder="Link text"
                type="text"
                value={ values.page }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.page && touched.page ? 'text-input error' : 'text-input' }
            />
            {errors.page && touched.page && ( <div className="input-feedback">{errors.page}</div>
            )}
            <Input
                fluid
                style={{ paddingBottom: '5px' }}
                icon='write'
                iconPosition='left'
                id="editnote"
                placeholder="Edited to..."
                type="text"
                value={ values.editnote }
                onChange={ handleChange }
                onBlur={ handleBlur }
                className={ errors.editnote && touched.editnote ? 'text-input error' : 'text-input' }
            />
            {errors.editnote && touched.editnote && ( <div className="input-feedback">{errors.editnote}</div>
            )}
            <Button 
                fluid
                color="blue" 
                size="large" 
                type="submit" 
                disabled={isSubmitting}
                >
                Submit
                </Button>
            </Form>
            )}
        </Formik>
  );
}

export default EditAffix;