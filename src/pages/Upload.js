import React from "react";
import Uploady from "@rpldy/uploady";
import { Button, Grid, Icon } from  "semantic-ui-react";

const Upload = () => (
    <>
    <Grid textAlign='center'  verticalAlign='top'>
        <Grid.Column>
            <Grid.Row>
                <Uploady destination={{url: "https://thecolrc.org/upload"}}>
                <Button icon labelPosition='right'>
                    <Icon name='upload' />
                        Upload File
                    </Button>
                </Uploady>
            </Grid.Row>
        </Grid.Column>
    </Grid>
    </>
);

export default Upload