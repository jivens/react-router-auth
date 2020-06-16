import React, { useState } from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import { broadCastSuccess } from '../utils/messages'
import { useQuery } from '@apollo/react-hooks'
import { getAffixesQuery } from './../queries/queries'
import AffixTable from "./AffixTable";

function Affixes(props) {
  const { client } = useAuth();
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
   
  const { loading, error, data } = useQuery(getAffixesQuery, {client: client, variables: { limit: limit, offset: offset} });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  
  return <AffixTable setLimit={setLimit} setOffset={setOffset} affixes={data.affixes} />;
  
}

export default Affixes;