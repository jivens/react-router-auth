import React from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import { broadCastSuccess } from '../utils/messages'
import { useQuery } from '@apollo/react-hooks'
import { getAffixesQuery } from './../queries/queries'
import AffixTable from "./AffixTable";

function Affixes(props) {
  const { client } = useAuth();
  
 
  const { loading, error, data } = useQuery(getAffixesQuery, {client: client});

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  
  return <AffixTable affixes={data.affixes} />;
  
}

export default Affixes;