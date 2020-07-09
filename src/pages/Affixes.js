import React, { useState } from "react"
import { Button } from "../components/AuthForm"
import { useAuth } from "../context/auth"
import { broadCastSuccess } from '../utils/messages'
import { useQuery } from '@apollo/react-hooks'
import { getUsernamesQuery, getActiveValuesQuery, getAffixTypesQuery } from './../queries/queries'
import AffixTable from "./AffixTable"

function Affixes(props) {
  const { client } = useAuth()

  let { loading: usersLoading, error: usersError, data: usersData } = useQuery(getUsernamesQuery, {client: client })  
  let { loading: activesLoading, error: activesError, data: activesData } = useQuery(getActiveValuesQuery, {client: client }) 
  let { loading: affixTypesLoading, error: affixTypesError, data: affixTypesData } = useQuery(getAffixTypesQuery, {client: client })  

  if (usersLoading || activesLoading || affixTypesLoading) {
    return <div>Loading...</div>
  }
  if (usersError) {
    console.error(usersError)
    return <div>Error!</div>
  }
  if (activesError) {
    console.error(activesError)
    return <div>Error!</div>
  }
  if (affixTypesError) {
    console.error(affixTypesError)
    return <div>Error!</div>
  }

  let usernameSelections = []
  let users = usersData.users
  users.forEach((item) => {
    usernameSelections.push(item.username)
  })

  let activeSelections = []
  let actives = activesData.actives
  actives.forEach((item) => {
    activeSelections.push(item.value)
  })  
  
  let affixTypeSelections = []
  let affixTypes = affixTypesData.affix_types
  affixTypes.forEach((item) => {
    affixTypeSelections.push(item.value)
  })

  let selectValues = {
    "user.username": usernameSelections,
    "activeByActive.value": activeSelections,
    "affix_type.value": affixTypeSelections
  }

  //return <AffixTable setLimit={setLimit} setOffset={setTheOffset} affixes={data.affixes} />;
  return <AffixTable selectValues={selectValues} />
  
}

export default Affixes;