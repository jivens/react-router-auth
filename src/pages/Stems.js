import React from "react"
import { useAuth } from "../context/auth"
import { useQuery } from '@apollo/react-hooks'
import { getUsernamesQuery, getStemCategoriesQuery } from './../queries/queries'
import StemTable from "./StemTable"

function Stems(props) {
  const { client } = useAuth()

  let { loading: usersLoading, error: usersError, data: usersData } = useQuery(getUsernamesQuery, {client: client })  
  let { loading: stemCategoriesLoading, error: stemCategoriesError, data: stemCategoriesData } = useQuery(getStemCategoriesQuery, {client: client })  

  if (usersLoading || stemCategoriesLoading) {
    return <div>Loading...</div>
  }
  if (usersError) {
    console.error(usersError)
    return <div>Error!</div>
  }
  if (stemCategoriesError) {
    console.error(stemCategoriesError)
    return <div>Stem Category Loading Error!</div>
  }

  let usernameSelections = []
  let users = usersData.users
  users.forEach((item) => {
    usernameSelections.push(item.username)
  })

  
  let stemCategorySelections = []
  console.log(stemCategoriesData)
  let stemCategories = stemCategoriesData.stem_categories
  stemCategories.forEach((item) => {
    stemCategorySelections.push(item.value)
  })

  let selectValues = {
    "user.username": usernameSelections,
    "stem_category.value": stemCategorySelections
  }


  //return <stemTable setLimit={setLimit} setOffset={setTheOffset} stemes={data.stemes} />;
  return <StemTable selectValues={selectValues} />
  
}

export default Stems;