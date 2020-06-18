import React, { useState } from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import { broadCastSuccess } from '../utils/messages'
import { useQuery } from '@apollo/react-hooks'
import { getAffixesQuery } from './../queries/queries'
import AffixTable from "./AffixTable";

function Affixes(props) {
  const { client } = useAuth();
  let [limit, setLimit] = useState(20);
  let [offset, setOffset] = useState(0);
  let setTheOffset = (offset) => { 
    console.log(offset)
    setOffset(offset)
  }
  
  let { loading, error, data } = useQuery(getAffixesQuery, {client: client, variables: { limit: limit, offset: offset} });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  
  return <AffixTable setLimit={setLimit} setOffset={setTheOffset} affixes={data.affixes} />;
  
}

export default Affixes;