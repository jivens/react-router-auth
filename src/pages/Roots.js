import React from "react"
import { useAuth } from "../context/auth"
import { Grid } from 'semantic-ui-react'
import RootsAccordion from "./accordions/RootsAccordion";
import RootTable from "./RootTable"

function Roots(props) {
  const { client } = useAuth()

  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width="16">
          <Grid.Row>
            <RootsAccordion />
          </Grid.Row>
          <Grid.Row>
            <RootTable/>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}

export default Roots;