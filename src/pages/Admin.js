import React from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import { toast } from 'react-toastify'

function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
    toast.success(`Logged Out`)
  }

  return (
    <div>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;