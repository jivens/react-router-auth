import React from "react"
import { Grid } from "semantic-ui-react"
import { useAuth } from "../context/auth"
import { useQuery } from '@apollo/react-hooks'
import { getUsernamesQuery, getAffixTypesQuery } from './../queries/queries'
import AffixesAccordion from "./accordions/AffixesAccordion";
import AffixTable from "./AffixTable"

function Affixes(props) {
  const { client } = useAuth()

  let { loading: usersLoading, error: usersError, data: usersData } = useQuery(getUsernamesQuery, {client: client })  
  let { loading: affixTypesLoading, error: affixTypesError, data: affixTypesData } = useQuery(getAffixTypesQuery, {client: client })  

  if (usersLoading || affixTypesLoading) {
    return <div>Loading...</div>
  }
  if (usersError) {
    console.error(usersError)
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

  
  let affixTypeSelections = []
  let affixTypes = affixTypesData.affix_types
  affixTypes.forEach((item) => {
    affixTypeSelections.push(item.value)
  })

  let selectValues = {
    "user.username": usernameSelections,
    "affix_type.value": affixTypeSelections
  }


  //return <AffixTable setLimit={setLimit} setOffset={setTheOffset} affixes={data.affixes} />;
  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width="16">
          <Grid.Row>
            <AffixesAccordion />
          </Grid.Row>
          <Grid.Row>
            <AffixTable selectValues={selectValues} globalSearch={""} />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}

export default Affixes;