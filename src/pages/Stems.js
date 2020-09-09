import React from "react"
import { useAuth } from "../context/auth"
import { useQuery } from '@apollo/react-hooks'
import { getUsernamesQuery } from './../queries/queries'
import StemTable from "./StemTable"

function Stems(props) {
  const { client } = useAuth()

  let { loading: usersLoading, error: usersError, data: usersData } = useQuery(getUsernamesQuery, {client: client })  

  if (usersLoading ) {
    return <div>Loading...</div>
  }
  if (usersError) {
    console.error(usersError)
    return <div>Error!</div>
  }

  let usernameSelections = []
  let users = usersData.users
  users.forEach((item) => {
    usernameSelections.push(item.username)
  })
  
  let selectValues = {
    "user.username": usernameSelections,
  }

  //return <AffixTable setLimit={setLimit} setOffset={setTheOffset} affixes={data.affixes} />;
  return <StemTable selectValues={selectValues} />
  
}

export default Stems;