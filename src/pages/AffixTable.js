import React from 'react'
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useFlexLayout, useResizeColumns } from 'react-table'
import { Button, Segment } from 'semantic-ui-react'
import TableStyles from './../stylesheets/table-styles'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn, SelectColumnFilter } from './../utils/Filters'
import { IndeterminateCheckbox } from './../utils/Checkbox'


const headerProps = (props, { column }) => getStyles(props, column.align)
const cellProps = (props, { cell }) => getStyles(props, cell.column.align)
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

function Table({
  columns,
  data,
  loading,
   })
  { const filterTypes = React.useMemo(
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
    rows,
    page,
    state,
    flatColumns,
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
    getToggleHideAllColumnsProps,
    setHiddenColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      hiddenColumns: columns.filter(column => !column.show).map(column => column.id),
    },
    useResizeColumns,
    useFlexLayout,
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  )

// React.useEffect(() => {
// const hiddenColumns = flatColumns.filter((column: any) => !column.show).map((column: any)=> column.id);
// setHiddenColumns(hiddenColumns); }, []);

{/* <li>
  <IndeterminateCheckbox {...getToggleHideAllColumnsProps()}/>
      Toggle All
</li>
{flatColumns.map(column => (
  <div>
    <li key={column.id}>
    <label>
      <input type="checkbox" {...column.getToggleHiddenProps()}/>{' '}
      {column.Header}
    </label>
    </li>
  </div>
))}  */}


  // Render the UI for your table
  return (
    <React.Fragment>
      <div className="columnToggle">
        <ul>
          <li>
            <span>Show/Hide Columns:</span>
          </li>
        </ul>
      </div>

      <Segment>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          />
      </Segment>

      <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} >
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps(), headerProps)}>{column.render('Header')}
                    {column.canResize && (
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? 'isResizing' : ''
                        }`}
                      />
                    )}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
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
            prepareRow(row);
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
              <td colSpan="10">Loading...</td>
            ) : (
              <td colSpan="10">
                Showing {page.length} of ~{pageCount * pageSize}{' '}
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
    </React.Fragment>
  )
}


function AffixTable({affixes}) {
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
        Filter: SelectColumnFilter,
        tableName: 'AffixTable',
        show: true,
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        filter: 'fuzzyText',
        tableName: 'AffixTable',
        show: true,
      },
      {
        Header: 'English',
        accessor: 'english',
        filter: 'fuzzyText',
        tableName: 'AffixTable',
        show: true,
      },
      {
        Header: 'Link',
        accessor: 'link',
        disableFilters: true,
        Cell: ({ row }) => <a href={row.original.link} target="_blank" rel="noopener noreferrer">{row.original.page}</a>,
        tableName: 'AffixTable',
        show: true,
      },
      {
        Header: 'Username',
        accessor: 'user.username',
        Filter: SelectColumnFilter,
        filter: 'includes',
        tableName: 'AffixTable',
        show: false,
      },
      {
        Header: 'Active',
        accessor: 'active',
        filter: 'fuzzyText',
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
        Cell: ({row, original}) => (
          <div>
            <Button>
                !E
            </Button>
            <Button>
                !X
            </Button>
          </div>
        )
      },
    ]
  )

  const [data] = React.useState(() => affixes)
  console.log(data)

  return (
    <TableStyles>
      <Table
        columns={columns}
        data={data}
      />
    </TableStyles>
  )
}

export default AffixTable