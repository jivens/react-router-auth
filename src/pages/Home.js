import React from "react";
import { useAuth } from "../context/auth";
 

function Home(props) {
	const { user } = useAuth();
	
	if (user) {
  		return <div>Home Page {user.username}</div>;		
	}
  	return <div>Home Page with no user</div>;
}

export default Home;