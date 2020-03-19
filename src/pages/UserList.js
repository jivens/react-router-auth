import React from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import { broadCastSuccess } from '../utils/messages'

function UserList(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
    broadCastSuccess(`Logged Out`)
  }

  return (
    <div>
      <div>UserList</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default UserList;