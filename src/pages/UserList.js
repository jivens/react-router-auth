import React from "react";
import { Button } from "../components/AuthForm";
import { useTable } from 'react-table';
import styled from 'styled-components'
import { useAuth } from "../context/auth";
import { handleErrors } from '../utils/messages'
import { getUsersQuery } from '../queries/queries';

function UserList(props) {
  const { client } = useAuth();

  function getUsers() {
    let users = []
    // try {
      client.query({
        query: getUsersQuery,
        errorPolicy: 'all'
      }).then((usersQuery) => {
        console.log(usersQuery)
        let userData = usersQuery.data.users_Q
        return userData
      })
      .catch((error) => {
        return []
      })
      //console.log('Users Query', usersQuery)
      //users = usersQuery.data.users_Q
      //return users
    // } 
    // catch(e) {
    //   handleErrors(e)
    //   return []
    // }
  }

  function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })

    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  //const userData = getUsers()
  const userData = props.userListData
  console.log("The user data:", userData)

  const columns = React.useMemo(
    () => [
      {
        Header: 'First',
        accessor: 'first'
      },
      {
        Header: 'Last',
        accessor: 'last'
      },
    ],
    []
  )



  return (
    <Table columns={columns} data={userData} />
  )

}

export default UserList;