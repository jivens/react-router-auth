import React from 'react';
import { Grid, Header, Segment, Button } from 'semantic-ui-react';
import { useAuth } from "../context/auth";
import { broadCastSuccess } from '../utils/messages';

function Users(props) {

  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
    broadCastSuccess(`Logged Out`)
  }

  return (
    <Grid textAlign='center'  verticalAlign='top'>
      <Grid.Column style={{ maxWidth: 600 }} textAlign='center'>
        <Header as='h2'  textAlign='center'>
            User Actions
        </Header>
        <Segment stacked textAlign='center'>
          <Button size='large' color='blue' onClick={(e)=> props.history.push('/userprofile')}>
            Update Your Profile
          </Button>
          <Button size='large' color='black' path='/changepassword' onClick={(e) => props.history.push('/changepassword')}>
            Change Your Password
          </Button>
          <Button size='large' color='blue'
            onClick={(e) => {
              logOut()
              props.history.push('/')
            }}>
            Logout
          </Button>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Users