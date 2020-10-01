import React from "react"
import { useLocation } from 'react-router-dom';
import { useAuth } from "../context/auth"
import { useQuery } from '@apollo/react-hooks'
import { getUsernamesQuery } from './../queries/queries'
import { Grid } from 'semantic-ui-react'
import RootTable from "./RootTable"

function SearchResults(props) {
  const { client } = useAuth()
  const search = new URLSearchParams(useLocation().search)
  const globalSearch = search.get("search")

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

  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width="16">
          <Grid.Row>
            <RootTable selectValues={selectValues} globalSearch={globalSearch}/>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}


export default SearchResults