import React from "react";
import { Button } from "../components/AuthForm";
import { useTable } from 'react-table';
import styled from 'styled-components'
import { useAuth } from "../context/auth";
import { handleErrors } from '../utils/messages'
import { getUsersQuery } from '../queries/queries';

  const TableStyles = styled.div`
    padding: 1rem;
     table {
      display: block;
      width: 100%;
      overflow: auto;
      thead {
        display: block;
        width: 100%;
      }
      tbody {
        display: block;
        width: 100%;
        box-sizing:border-box;
        box-shadow:0 2px 15px 0 rgba(0,0,0,0.15);
        overflow: auto;
        padding: 1rem;
      }
      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
        border-bottom: 1px solid #ddd;
      }
      th {
        display: block;
        border: 0px;
        background: #fafafa;
        padding: .5rem;
        text-align: left;
      },
      td {
        margin: 0;
        padding: 0.5rem;
        word-wrap: break-word;
        border-left: 1px solid #ddd;
        :first-child {
          border-left: 0;
          }
        position: relative;
        :last-child {
          border-right: 0;
          }
        .resizer {
          right: -1.5px;
          background: #ddd;
          width: 3px;
          height: 100%;
          position: absolute;
          top: 0;
          z-index: 1;
          touch-action:none;
          &.isResizing {
            background: #ddd;
          }
        }
      }
      th {
        &:last-of-type {
          resizer {
            right: -2px;
          }
        }
      }
    }

    pagination: {
      padding: 10px;
    }

    globalFilter: {
      padding: 50px 10px 20px 30px;
    }
    ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      line-height: -1em;
      margin: 0px;
      padding: 0px;
    }
    li {
      padding: 1rem;
    }
  `

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
      {
        Header: 'Username',
        accessor: 'username'
      },
      {
        Header: 'Roles',
        accessor: 'roles'
      },
    ],
    []
  )



  return (
    <TableStyles>
      <Table columns={columns} data={userData} />
    </TableStyles>
  )

}

export default UserList;