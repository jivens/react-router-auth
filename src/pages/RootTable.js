import React from 'react'
import { Link } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter  } from 'react-table'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn, SelectColumnFilter } from '../utils/Filters'
import { useAuth } from "../context/auth";
import { sortReshape, filterReshape } from "./../utils/reshapers"
import TableStyles from "./../stylesheets/table-styles"
import { Icon, Button } from "semantic-ui-react";
import { getRootsQuery, getAnonRootsQuery } from './../queries/queries'

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  selectValues
}) {

  const { user } = useAuth();
  //console.log("Inside table, I have select values: ", selectValues)

  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )


  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,       // Let's set up our default Filter UI
      minWidth: 25, // minWidth is only used as a limit for resizing
      width: 50, // width is used for both the flex-basis and flex-grow
      maxWidth: 500, // maxWidth is only used as a limit for resizing
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    allColumns,
    //getToggleHideAllColumnsProps,
    setHiddenColumns,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy, filters, globalFilter }
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
      manualSortBy: true,
      manualFilters: true,
      manualGlobalFilter: true,
      defaultColumn,
      filterTypes,
      //hiddenColumns: columns.filter(column => !column.show).map(column => column.id),
      selectValues
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,   
  )


// Listen for changes in pagination and use the state to fetch our new data
React.useEffect(() => {
  fetchData({ pageIndex, pageSize, sortBy, filters, globalFilter })
}, [fetchData, pageIndex, pageSize, sortBy, filters, globalFilter])

React.useEffect(
  () => {
    setHiddenColumns(
      columns.filter(column => !column.show).map(column => column.id)
    );
  },
  [columns]
);

  // Render the UI for your table
  return (
    <>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
              sortBy,
              filters,
              globalFilter
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <div className="columnToggle">
        {allColumns.map(column => (
          <div key={column.id} className="columnToggle">
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.label}
            </label>
          </div>
        ))}
      </div>
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
            >
            { (user && (user.roles.includes('update') || user.roles.includes('manager')))  &&
              (
                <Link 
                  to={{
                    pathname: "/addroot",
                  }}>
                  <Button animated='vertical' basic color='blue'>
                    <Button.Content hidden>Add Root</Button.Content>
                    <Button.Content visible>
                      <Icon name='plus' />
                    </Button.Content>
                  </Button> 
                </Link> 
              )
            }
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <span {...column.getSortByToggleProps()}>
                    {column.render('Header')}                 
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ▼'
                        : ' ▲'
                      : ''}
                  </span>
                  <div>
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
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

function RootTable(props) {
  console.log(props.selectValues)
  const updateColumns = React.useMemo(
    () => [
      {
        Header: 'History/Edit/Delete',
        disableFilters: true,
        sortable: false,
        width: 100,
        show: true,
        id: 'historyEditDelete',
        label: 'History/Edit/Delete',
        tableName: 'RootTable',
        Cell: ({row, original}) => (
          <div className="buttons">
            <Link 
              to={{
                pathname: "/roothistory",
                search: "?id=" + row.original.id,
              }}>
              <button className="basic blue ui icon button">
                <Icon name="history" />
              </button>              
            </Link>
            <Link 
              to={{
                pathname: "/editroot",
                search: "?id=" + row.original.id,
              }}>
              <button className="basic blue ui icon button">
                <Icon name="edit" />
              </button>              
            </Link>
            <Link 
              to={{
                pathname: "/deleteroot",
                search: "?id=" + row.original.id,
              }}>
              <button className="basic blue ui icon button">
                <Icon name="close" />
              </button>              
            </Link>
          </div>
        )
      }, 
      {
        Header: 'Root',
        accessor: 'root',
        tableName: 'RootTable',
        id: 'root',
        show: true,
        width: 50,
        label: 'Root'
      },
      {
        Header: 'Number',
        accessor: 'number',
        tableName: 'RootTable',
        id: 'number',
        show: false,
        width: 50,
        label: 'Number'
      },
      {
        Header: 'Sense',
        accessor: 'sense',
        tableName: 'RootTable',
        id: 'sense',
        show: false,
        width: 50,
        label: 'Sense',
      },
      {
        Header: 'Salish',
        accessor: 'salish',
        tableName: 'RootTable',
        id: 'salish',
        show: false,
        label: 'Salish',
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        tableName: 'RootTable',
        id: 'nicodemus',
        show: true,
        label: 'Nicodemus',
      },
      {
        Header: 'English',
        accessor: 'english',
        tableName: 'RootTable',
        id: 'english',
        show: true,
        label: 'English',
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
        tableName: 'RootTable',
        id: 'symbol',
        show: false,
        width: 50,
        label: 'Symbol',
      },
      {
        Header: 'Grammar',
        accessor: 'grammar',
        tableName: 'RootTable',
        id: 'grammar',
        show: false,
        width: 50,
        label: 'Grammar',
      },
      {
        Header: 'Crossref',
        accessor: 'crossref',
        tableName: 'RootTable',
        id: 'crossref',
        show: false,
        label: 'Crossref',
      },
      {
        Header: 'Variant',
        accessor: 'variant',
        tableName: 'RootTable',
        id: 'variant',
        show: false,
        label: 'Variant'
      },
      {
        Header: 'Cognate',
        accessor: 'cognate',
        tableName: 'RootTable',
        id: 'cognate',
        show: false,
        label: 'Cognate',
      }
    ], []
  )

  const anonColumns = React.useMemo(
    () => [
      {
        Header: 'Root',
        accessor: 'root',
        tableName: 'RootTable',
        id: 'root',
        show: true,
        width: 50,
        label: 'Root'
      },
      {
        Header: 'Number',
        accessor: 'number',
        tableName: 'RootTable',
        id: 'number',
        show: false,
        width: 50,
        label: 'Number'
      },
      {
        Header: 'Sense',
        accessor: 'sense',
        tableName: 'RootTable',
        id: 'sense',
        show: false,
        width: 50,
        label: 'Sense',
      },
      {
        Header: 'Salish',
        accessor: 'salish',
        tableName: 'RootTable',
        id: 'salish',
        show: false,
        label: 'Salish',
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        tableName: 'RootTable',
        id: 'nicodemus',
        show: true,
        label: 'Nicodemus',
      },
      {
        Header: 'English',
        accessor: 'english',
        tableName: 'RootTable',
        id: 'english',
        show: true,
        label: 'English',
      },
      {
        Header: 'Symbol',
        accessor: 'symbol',
        tableName: 'RootTable',
        id: 'symbol',
        show: false,
        width: 50,
        label: 'Symbol',
      },
      {
        Header: 'Grammar',
        accessor: 'grammar',
        tableName: 'RootTable',
        id: 'grammar',
        show: false,
        width: 50,
        label: 'Grammar',
      },
      {
        Header: 'Crossref',
        accessor: 'crossref',
        tableName: 'RootTable',
        id: 'crossref',
        show: false,
        label: 'Crossref',
      },
      {
        Header: 'Variant',
        accessor: 'variant',
        tableName: 'RootTable',
        id: 'variant',
        show: false,
        label: 'Variant'
      },
      {
        Header: 'Cognate',
        accessor: 'cognate',
        tableName: 'RootTable',
        id: 'cognate',
        show: false,
        label: 'Cognate',
      },
    ], []
  )
  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  //const [orderBy, setOrderBy] = React.useState([{'english': 'desc'}, {'nicodemus': 'asc'}])
  const fetchIdRef = React.useRef(0)
  const { client, user } = useAuth();

  async function getRoots(limit, offset, sortBy, filters) {
    let res = {}
    if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) { 
      res = await client.query({
        query: getRootsQuery,
        variables: { 
          limit: limit,
          offset: offset,
          root_order: sortBy,
          where: filters,
         }
      })
    }
    else {
      res = await client.query({
        query: getAnonRootsQuery,
        variables: { 
          limit: limit,
          offset: offset,
          root_order: sortBy,
          where: filters,
        }
      })
    }
    return res.data
  }  

  const fetchData = React.useCallback(({ pageSize, pageIndex, sortBy, filters, globalFilter }) => {
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
        const controlledSort = sortReshape(sortBy) 
        const controlledFilter = filterReshape(filters, globalFilter, ["english", "nicodemus", "salish"])
        console.log(controlledFilter)
        // reset to first page when filters change
        // if (filters.length > 0) {
        //   pageIndex = 0
        // }
        getRoots(pageSize, pageSize * pageIndex, controlledSort, controlledFilter)
        .then((data) => {
          let totalCount = data.roots_aggregate.aggregate.count
          setData(data.roots)
          setPageCount(Math.ceil(totalCount / pageSize))
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

  let columns = {}
  if(user && intersectionWith(["manager", "update"], user.roles, isEqual).length >= 1) {
    columns = updateColumns
  } else {
    columns = anonColumns
  }

  return (
    <TableStyles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        selectValues={props.selectValues}
      />
    </TableStyles>
  )
}

export default RootTable