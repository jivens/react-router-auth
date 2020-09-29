import React from "react"
import SpellingTable from "./SpellingTable"
import { Grid } from "semantic-ui-react"
import SpellingAccordion from "./accordions/SpellingAccordion";

function Spelling(props) {
  //const { client } = useAuth()
  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width="16">
          <Grid.Row>
            <SpellingAccordion />
          </Grid.Row>
          <Grid.Row>
            <SpellingTable />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
  
}

export default Spelling;