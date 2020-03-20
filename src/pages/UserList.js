import React from "react";
import { Button } from "../components/AuthForm";
import { useTable } from 'react-table';
import styled from 'styled-components'
import { useAuth } from "../context/auth";
import { handleErrors, broadCastErrors, broadCastSuccess } from '../utils/messages'
import { getUsersQuery } from '../queries/queries';

function UserList(props) {
  const { client, user, setAuthTokens } = useAuth();
  async function getUsers(data) {
    try {
      let usersQuery = await client.query({
        query: getUsersQuery,
        errorPolicy: 'all'
      })
    } 
    catch(e) {
      handleErrors(e)
    }
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

  function UserTable() {
    const columns = React.useMemo(
      () => [
        {
          Header: 'First',
          accessor: user.first
        },
        {
          Header: 'Last',
          accessor: user.last
        },
      ],
      []
    )

    return (
      <Table columns={columns} data={getUsers.data} />
    )
  }
}

export default UserList;