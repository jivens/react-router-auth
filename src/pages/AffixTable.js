import React from 'react'
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter  } from 'react-table'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn, SelectColumnFilter } from '../utils/Filters'
import { useAuth } from "../context/auth";
import { getAffixesQuery } from './../queries/queries'
import { sortReshape, filterReshape } from "./../utils/reshapers"
import TableStyles from "./../stylesheets/table-styles"

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) {

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
    state: { pageIndex, pageSize, sortBy, filters, globalFilter },
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
      hiddenColumns: columns.filter(column => !column.show).map(column => column.id),
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
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
            >
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
                        ? ' 🔽'
                        : ' 🔼'
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


function AffixTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Edit/Delete',
        disableFilters: true,
        sortable: false,
        width: 100,
        show: false,
        id: 'editDelete',
        tableName: 'AffixTable',
        Cell: ({row, original}) => (
          <div>
            <button>
                !E
            </button>
            <button>
                !X
            </button>
          </div>
        )
      }, 
      // {
      //   Header: 'ID',
      //   accessor: 'id',
      //   tableName: 'AffixTable',
      //   show: false,
      //   disableFilters: true,
      //   id: 'id'
      // },
      {
        Header: 'Type',
        accessor: 'type',
        Filter: SelectColumnFilter,
        tableName: 'AffixTable',
        show: true,
        id: 'type'
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        tableName: 'AffixTable',
        show: true,
        id: 'nicodemus'
      },
      {
        Header: 'Salish',
        accessor: 'salish',
        filter: 'fuzzyText',
        tableName: 'AffixTable',
        show: true,
        id: 'salish'
      },
      {
        Header: 'English',
        accessor: 'english',
        tableName: 'AffixTable',
        show: true,
        id: 'english'
      },
      {
        Header: 'Link',
        accessor: 'page',
        Cell: ({ row }) => <a href={row.original.link} target="_blank" rel="noopener noreferrer">{row.original.page}</a>,
        tableName: 'AffixTable',
        show: true,
        id: 'page'
      },
      {
        Header: 'Username',
        accessor: 'user.username',
        Filter: SelectColumnFilter,
        tableName: 'AffixTable',
        show: false,
        id: 'username'
      },
      {
        Header: 'Active',
        accessor: 'active',
        Filter: SelectColumnFilter,
        width: 50,
        tableName: 'AffixTable',
        show: false,
        id: 'active'
      },
      {
        Header: 'Prev. ID',
        accessor: 'prevId',
        width: 50,
        disableFilters: true,
        tableName: 'AffixTable',
        show: false,
        id: 'prevId'
      },
      {
        Header: 'Edit Note',
        accessor: 'editnote',
        tableName: 'AffixTable',
        disableFilters: true,
        sortable: false,
        show: false,
        id: 'editnote'
      },
    ], []
  )

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const [orderBy, setOrderBy] = React.useState([{'english': 'desc'}, {'nicodemus': 'asc'}])
  const fetchIdRef = React.useRef(0)
  const { client } = useAuth();

  async function getAffixes(limit, offset, sortBy, filters) {
    const { data } = await client.query({
      query: getAffixesQuery,
      variables: { 
        limit: limit,
        offset: offset,
        affix_order: sortBy,
        where: filters,
       }
    })
    return data
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
        const controlledFilter = filterReshape(filters, globalFilter, ["english", "nicodemus", "salish", "page"])
        console.log(controlledFilter)
        // reset to first page when filters change
        // if (filters.length > 0) {
        //   pageIndex = 0
        // }
        getAffixes(pageSize, pageSize * pageIndex, controlledSort, controlledFilter)
        .then((data) => {
          let totalCount = data.affixes_aggregate.aggregate.count
          setData(data.affixes)
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

  return (
    <TableStyles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </TableStyles>
  )
}

export default AffixTable