import React from "react"
import { useAuth } from "../context/auth"
import TextTable from "./TextTable"
import TextsAccordion from "./accordions/TextsAccordion";

function Texts(props) {
  const { client } = useAuth()
  return (
    <React.Fragment>
      <TextsAccordion />
      <TextTable />
    </React.Fragment>
  )
  
}

export default Texts;