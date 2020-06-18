import React from 'react'
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'
import { useAuth } from "../context/auth";
import { useQuery } from '@apollo/react-hooks'
import { getAffixesQuery } from './../queries/queries'

//import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  )

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

  // Render the UI for your table
  return (
    <>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

// Let's simulate a large dataset on the server (outside of our component)
//const serverData = makeData(10000)

function AffixTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        tableName: 'AffixTable',
        show: false,
      },
      {
        Header: 'Type',
        accessor: 'type',
        //Filter: SelectColumnFilter,
        tableName: 'AffixTable',
        show: true,
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        //filter: 'fuzzyText',
        tableName: 'AffixTable',
        show: true,
      },
      {
        Header: 'English',
        accessor: 'english',
        //filter: 'fuzzyText',
        tableName: 'AffixTable',
        show: true,
      },
      {
        Header: 'Link',
        accessor: 'link',
        disableFilters: true,
        //Cell: ({ row }) => <a href={row.original.link} target="_blank" rel="noopener noreferrer">{row.original.page}</a>,
        tableName: 'AffixTable',
        show: true,
      },
      {
        Header: 'Username',
        accessor: 'user.username',
        //Filter: SelectColumnFilter,
        //filter: 'includes',
        tableName: 'AffixTable',
        show: false,
      },
      {
        Header: 'Active',
        accessor: 'active',
        //filter: 'fuzzyText',
        tableName: 'AffixTable',
        show: false,
      },
      {
        Header: 'Edit/Delete',
        filterable: false,
        sortable: false,
        width: 100,
        show: false,
        tableName: 'AffixTable',
        // Cell: ({row, original}) => (
        //   <div>
        //     <button>
        //         !E
        //     </button>
        //     <button>
        //         !X
        //     </button>
        //   </div>
        // )
      }, 
    ], []
  )

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)
  const { client } = useAuth();

  async function getAffixes(limit, offset) {
    const { data } = await client.query({
      query: getAffixesQuery,
      variables: { 
        limit: limit,
        offset: offset
       }
    })
    console.log(data)
    return data.affixes
    // .then((affixData) => {
    //   console.log(affixData.data.affixes)
    //   return affixData.data.affixes
    // })
    // .catch((error) => {
    //   console.log(error)
    //   return []
    // })  
  }  

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) { 
        getAffixes(pageSize, pageSize * pageIndex)
        .then((data) => {
          console.log(data)
          setData(data)
          setPageCount(Math.ceil(195 / pageSize))
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setData([])
          setPageCount(0)
          setLoading(false)
        })
      }
    }, 1000)
  }, [])

  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </Styles>
  )
}

export default AffixTable

//import React from 'react'
//import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useFlexLayout, useResizeColumns } from 'react-table'
//import { Button, Segment } from 'semantic-ui-react'
//import TableStyles from './../stylesheets/table-styles'
//import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn, SelectColumnFilter } from './../utils/Filters'
//import { IndeterminateCheckbox } from './../utils/Checkbox'


// const headerProps = (props, { column }) => getStyles(props, column.align)
// const cellProps = (props, { cell }) => getStyles(props, cell.column.align)
// const getStyles = (props, align = 'left') => [
//   props,
//   {
//     style: {
//       justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
//       alignItems: 'flex-start',
//       display: 'flex',
//     },
//   },
// ]

// function Table({
//   columns,
//   data,
//   setLimit,
//   setOffset,
//   loading,
//    })
//   { 
//     console.log(setOffset)
//     console.log(data)
//     const filterTypes = React.useMemo(
//     () => ({
//       fuzzyText: fuzzyTextFilterFn,
//       text: (rows, id, filterValue) => {
//         return rows.filter(row => {
//           const rowValue = row.values[id]
//           return rowValue !== undefined
//             ? String(rowValue)
//                 .toLowerCase()
//                 .startsWith(String(filterValue).toLowerCase())
//             : true
//         })
//       },
//     }),
//     []
//   )

//   const defaultColumn = React.useMemo(
//     () => ({
//       Filter: DefaultColumnFilter,       // Let's set up our default Filter UI
//       minWidth: 25, // minWidth is only used as a limit for resizing
//       width: 50, // width is used for both the flex-basis and flex-grow
//       maxWidth: 500, // maxWidth is only used as a limit for resizing
//     }),
//     []
//   )
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     rows,
//     page,
//     state,
//     flatColumns,
//     preGlobalFilteredRows,
//     setGlobalFilter,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     getToggleHideAllColumnsProps,
//     setHiddenColumns,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       defaultColumn,
//       filterTypes,
//       hiddenColumns: columns.filter(column => !column.show).map(column => column.id),
//     },
//     useResizeColumns,
//     useFlexLayout,
//     useGlobalFilter,
//     useFilters,
//     useSortBy,
//     usePagination
//   )

// // React.useEffect(() => {
// // const hiddenColumns = flatColumns.filter((column: any) => !column.show).map((column: any)=> column.id);
// // setHiddenColumns(hiddenColumns); }, []);

// {/* <li>
//   <IndeterminateCheckbox {...getToggleHideAllColumnsProps()}/>
//       Toggle All
// </li>
// {flatColumns.map(column => (
//   <div>
//     <li key={column.id}>
//     <label>
//       <input type="checkbox" {...column.getToggleHiddenProps()}/>{' '}
//       {column.Header}
//     </label>
//     </li>
//   </div>
// ))}  */}


//   // Render the UI for your table
//   return (
//     <React.Fragment>
//       <div className="columnToggle">
//         <ul>
//           <li>
//             <span>Show/Hide Columns:</span>
//           </li>
//         </ul>
//       </div>

//       <Segment>
//         <GlobalFilter
//           preGlobalFilteredRows={preGlobalFilteredRows}
//           globalFilter={state.globalFilter}
//           setGlobalFilter={setGlobalFilter}
//           />
//       </Segment>

//       <table {...getTableProps()}>
//         <thead>
//             {headerGroups.map(headerGroup => (
//               <tr {...headerGroup.getHeaderGroupProps()} >
//                 {headerGroup.headers.map(column => (
//                   <th {...column.getHeaderProps(column.getSortByToggleProps(), headerProps)}>{column.render('Header')}
//                     {column.canResize && (
//                       <div
//                         {...column.getResizerProps()}
//                         className={`resizer ${
//                           column.isResizing ? 'isResizing' : ''
//                         }`}
//                       />
//                     )}
//                     {column.isSorted
//                       ? column.isSortedDesc
//                         ? ' 🔽'
//                         : ' 🔼'
//                       : ''}
//                       <div>
//                       {column.canFilter ? column.render('Filter') : null}
//                       </div>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row, i) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 })}
//               </tr>
//             )
//           })}
//           <tr>
//             {loading ? (
//               // Use our custom loading state to show a loading indicator
//               <td colSpan="10">Loading...</td>
//             ) : (
//               <td colSpan="10">
//                 Showing {page.length} of ~{pageCount * pageSize}{' '}
//                 results
//               </td>
//             )}
//           </tr>
//         </tbody>
//       </table>

//       <div className="pagination">
//         <button onClick={() => setOffset(0)} disabled={!canPreviousPage}>
//           {'<<'}
//         </button>{' '}
//         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           {'<'}
//         </button>{' '}
//         <button onClick={() => nextPage()} disabled={!canNextPage}>
//           {'>'}
//         </button>{' '}
//         <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           {'>>'}
//         </button>{' '}
//         <span>
//           Page{' '}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>{' '}
//         </span>
//         <span>
//           | Go to page:{' '}
//           <input
//             type="number"
//             defaultValue={pageIndex + 1}
//             onChange={e => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0
//               gotoPage(page)
//             }}
//             style={{ width: '100px' }}
//           />
//         </span>{' '}
//         <select
//           value={pageSize}
//           onChange={e => {
//             setPageSize(Number(e.target.value))
//           }}
//         >
//           {[10, 20, 30, 40, 50].map(pageSize => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </React.Fragment>
//   )
// }


// function AffixTable({setLimit, setOffset, affixes}) {
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'ID',
//         accessor: 'id',
//         tableName: 'AffixTable',
//         show: false,
//       },
//       {
//         Header: 'Type',
//         accessor: 'type',
//         Filter: SelectColumnFilter,
//         tableName: 'AffixTable',
//         show: true,
//       },
//       {
//         Header: 'Nicodemus',
//         accessor: 'nicodemus',
//         filter: 'fuzzyText',
//         tableName: 'AffixTable',
//         show: true,
//       },
//       {
//         Header: 'English',
//         accessor: 'english',
//         filter: 'fuzzyText',
//         tableName: 'AffixTable',
//         show: true,
//       },
//       {
//         Header: 'Link',
//         accessor: 'link',
//         disableFilters: true,
//         Cell: ({ row }) => <a href={row.original.link} target="_blank" rel="noopener noreferrer">{row.original.page}</a>,
//         tableName: 'AffixTable',
//         show: true,
//       },
//       {
//         Header: 'Username',
//         accessor: 'user.username',
//         Filter: SelectColumnFilter,
//         filter: 'includes',
//         tableName: 'AffixTable',
//         show: false,
//       },
//       {
//         Header: 'Active',
//         accessor: 'active',
//         filter: 'fuzzyText',
//         tableName: 'AffixTable',
//         show: false,
//       },
//       {
//         Header: 'Edit/Delete',
//         filterable: false,
//         sortable: false,
//         width: 100,
//         show: false,
//         tableName: 'AffixTable',
//         Cell: ({row, original}) => (
//           <div>
//             <Button>
//                 !E
//             </Button>
//             <Button>
//                 !X
//             </Button>
//           </div>
//         )
//       },
//     ]
//   )

//   const [data] = React.useState(() => affixes)
//   console.log(data)

//   return (
//     <TableStyles>
//       <Table
//         columns={columns}
//         data={data}
//         setLimit={setLimit}
//         setOffset={setOffset}
//       />
//     </TableStyles>
//   )
// }

// export default AffixTable