import React from "react";
import { useTable, useSortBy } from 'react-table';
import TableStyles from "../components/table-styles";
import { GlobalFilter } from "../components/Filters"
import { Grid } from 'semantic-ui-react';

  
function UserList(props) {

  const headerProps = (props, { column }) => getStyles(props, column.align)
  const getStyles = (props, align = 'left') => [
    props,
    {
      style: {
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
      },
    },
  ]
  //const { client } = useAuth();

  // function getUsers() {
  //   let users = []
  //   // try {
  //     client.query({
  //       query: getUsersQuery,
  //       errorPolicy: 'all'
  //     }).then((usersQuery) => {
  //       console.log(usersQuery)
  //       let userData = usersQuery.data.users_Q
  //       return userData
  //     })
  //     .catch((error) => {
  //       return []
  //     })
  // }

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
      },
      useSortBy,
    )

    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps(), headerProps)}>{column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? "↑" : "↓") : ""}
                </th>
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
        accessor: 'roles',
        Cell: ({ cell: { value } }) => ( value.join(", ")),
      }
    ],
    []
  )

  return (
    <React.Fragment>
      <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='bottom'>
        <Grid.Row>
          <h3>Manage Users</h3>
        </Grid.Row>
        <Grid.Row>
          <TableStyles>
            <Table 
              columns={columns} 
              data={userData} 
            />
          </TableStyles>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  )

}

export default UserList;