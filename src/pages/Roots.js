import React from "react"
import { useAuth } from "../context/auth"
import { useQuery } from '@apollo/react-hooks'
import { getUsernamesQuery, getActiveValuesQuery } from './../queries/queries'
import RootTable from "./RootTable"

function Roots(props) {
  const { client } = useAuth()

  let { loading: usersLoading, error: usersError, data: usersData } = useQuery(getUsernamesQuery, {client: client })  
  let { loading: activesLoading, error: activesError, data: activesData } = useQuery(getActiveValuesQuery, {client: client }) 

  if (usersLoading || activesLoading ) {
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
  
  let selectValues = {
    "user.username": usernameSelections,
    "activeByActive.value": activeSelections,
  }

  //return <AffixTable setLimit={setLimit} setOffset={setTheOffset} affixes={data.affixes} />;
  return <RootTable selectValues={selectValues} />
  
}

export default Roots;