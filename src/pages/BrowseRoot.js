import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
import { intersectionWith, isEqual } from 'lodash';
import { useTable, useSortBy, useFilters, useGlobalFilter  } from 'react-table'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn, NarrowColumnFilter } from '../utils/Filters'
import { useAuth } from "../context/auth";
import { sortReshape, filterReshape } from "./../utils/reshapers"
import TableStyles from "../stylesheets/table-styles"
import { Icon, Message, Button } from "semantic-ui-react";
import { getBrowseRootQuery } from '../queries/queries'
import { handleErrors } from '../utils/messages';
import  BrowseList  from '../utils/BrowseList'


function Table({
  columns,
  data,
  fetchData,
  loading,
  selectValues,
  globalSearch
}) 
{
    let happy = new URLSearchParams(useLocation().search)
    let root = happy.get('root')

    const { user } = useAuth();

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
        Filter: DefaultColumnFilter,   
        minWidth: 50, // minWidth is only used as a limit for resizing
        width: 200, // width is used for both the flex-basis and flex-grow
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
            state,   
            allColumns,
            setHiddenColumns,
            visibleColumns,
            preGlobalFilteredRows,
            setGlobalFilter,
            // Get the state from the instance
            state: { sortBy, filters, globalFilter }
      } = useTable(
        {
            columns,
            data,
            initialState: { 
              globalFilter: ((globalSearch && globalSearch !== '') ? globalSearch : null)
             }, // Pass our hoisted table state
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
     )


     React.useEffect(() => {
      fetchData({ sortBy, filters, globalFilter })
      }, 
      [fetchData, sortBy, filters, globalFilter])
    

    React.useEffect(
        () => {
            setHiddenColumns(
            columns.filter(column => !column.show).map(column => column.id)
            );
        },
        [columns, setHiddenColumns]
    );

  return (
    <>
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
      <BrowseList/>
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
                  <Button animated='vertical' color='blue'>
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

    </>
  )
}

function BrowseRootTable(props) {
    let history = useHistory()
    let happy = new URLSearchParams(useLocation().search)
    let root = happy.get('root')
    console.log('the root is ', root)    
  const updateColumns = React.useMemo(
    () => [
      {
        Header: '',
        disableFilters: true,
        sortable: false,
        show: true,
        width: 100,
        id: 'historyEditDelete',
        label: 'History/Edit/Delete',
        tableName: 'BrowseRootTable',
        Cell: ({row, original}) => (
          <div className="buttons">
            <Link 
              to={{
                pathname: "/roothistory",
                search: "?id=" + row.original.id,
              }}>
              <button className="ui mini blue icon button">
                <Icon name="history" />
              </button>              
            </Link>
            <Link 
              to={{
                pathname: "/editroot",
                search: "?id=" + row.original.id,
              }}>
              <button className="ui mini black icon button">
                <Icon name="edit" />
              </button>              
            </Link>
            <Link 
              to={{
                pathname: "/deleteroot",
                search: "?id=" + row.original.id,
              }}>
              <button className="ui mini blue icon button">
                <Icon name="close" />
              </button>              
            </Link>
          </div>
        )
      }, 
      {
        Header: '√',
        width: 75,
        accessor: 'root',
        tableName: 'BrowseRootTable',
        id: 'root',
        show: true,
        label: 'Root'
      },
      {
        Header: '#',
        width: 75,
        accessor: 'number',
        tableName: 'BrowseRootTable',
        id: 'number',
        show: false,
        label: 'Number'
      },
      {
        Header: 'Sns.',
        width: 100,
        accessor: 'sense',
        tableName: 'BrowseRootTable',
        id: 'sense',
        show: false,
        label: 'Sense',
      },
      {
        Header: 'Salish',
        width: 150,
        accessor: 'salish',
        tableName: 'BrowseRootTable',
        id: 'salish',
        show: false,
        label: 'Salish',
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        width: 250,
        tableName: 'BrowseRootTable',
        id: 'nicodemus',
        show: true,
        label: 'Nicodemus',
      },
      {
        Header: 'English',
        accessor: 'english',
        tableName: 'BrowseRootTable',
        id: 'english',
        show: true,
        label: 'English',
      },
      {
        Header: '§',
        accessor: 'symbol',
        width: 100,
        tableName: 'BrowseRootTable',
        id: 'symbol',
        show: false,
        label: 'Symbol',
      },
      {
        Header: 'Gr.',
        accessor: 'grammar',
        width: 100,
        tableName: 'BrowseRootTable',
        id: 'grammar',
        show: false,
        label: 'Grammar',
      },
      {
        Header: 'x-ref',
        accessor: 'crossref',
        width: 150,
        tableName: 'BrowseRootTable',
        id: 'crossref',
        show: false,
        label: 'Cross Reference',
      },
      {
        Header: 'Var.',
        accessor: 'variant',
        width: 150,
        tableName: 'BrowseRootTable',
        id: 'variant',
        show: false,
        label: 'Variant'
      },
      {
        Header: 'Cog.',
        accessor: 'cognate',
        width: 150,
        tableName: 'BrowseRootTable',
        id: 'cognate',
        show: false,
        label: 'Cognate',
      },
    ], []
  )

  const anonColumns = React.useMemo(
    () => [
      {
        Header: '√',
        width: 75,
        accessor: 'root',
        tableName: 'BrowseRootTable',
        id: 'root',
        show: true,
        label: 'Root'
      },
      {
        Header: '#',
        width: 75,
        accessor: 'number',
        tableName: 'BrowseRootTable',
        id: 'number',
        show: false,
        label: 'Number'
      },
      {
        Header: 'Sns.',
        width: 100,
        accessor: 'sense',
        tableName: 'BrowseRootTable',
        id: 'sense',
        show: false,
        label: 'Sense',
      },
      {
        Header: 'Salish',
        width: 150,
        accessor: 'salish',
        tableName: 'BrowseRootTable',
        id: 'salish',
        show: false,
        label: 'Salish',
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        width: 250,
        tableName: 'BrowseRootTable',
        id: 'nicodemus',
        show: true,
        label: 'Nicodemus',
      },
      {
        Header: 'English',
        accessor: 'english',
        tableName: 'BrowseRootTable',
        id: 'english',
        show: true,
        label: 'English',
      },
      {
        Header: '§',
        accessor: 'symbol',
        width: 100,
        tableName: 'BrowseRootTable',
        id: 'symbol',
        show: false,
        label: 'Symbol',
      },
      {
        Header: 'Gr.',
        accessor: 'grammar',
        width: 100,
        tableName: 'BrowseRootTable',
        id: 'grammar',
        show: false,
        label: 'Grammar',
      },
      {
        Header: 'x-ref',
        accessor: 'crossref',
        width: 150,
        tableName: 'BrowseRootTable',
        id: 'crossref',
        show: false,
        label: 'Cross Reference',
      },
      {
        Header: 'Var.',
        accessor: 'variant',
        width: 150,
        tableName: 'BrowseRootTable',
        id: 'variant',
        show: false,
        label: 'Variant'
      },
      {
        Header: 'Cog.',
        accessor: 'cognate',
        width: 150,
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
  const fetchIdRef = React.useRef(0)
  const { client, setAuthTokens, user } = useAuth();

  async function getRoots() {
     let res = {} 
     res = await client.query({
        query: getBrowseRootQuery,
        variables: {
            root: root
        }
      })
      return res.data
    }


  const fetchData = React.useCallback(({ sortBy, filters, globalFilter }) => {
    const fetchId = ++fetchIdRef.current
    setLoading(true)
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        const controlledSort = sortReshape(sortBy) 
        const controlledFilter = filterReshape(filters, globalFilter, ["root", "variant", "crossref", "cognate", "grammar", "english", "nicodemus", "salish"])
        getRoots(controlledSort, controlledFilter)
        .then((data) => {
          setData(data.roots)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          handleErrors(error, {'logout': {'action': setAuthTokens, 'redirect': '/login'}})
          setData([])
          setLoading(false)
          history.push('./login')
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
    <>
    <Message>Roots beginning with '{root}' </Message>
    <TableStyles>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        selectValues={props.selectValues}
        globalSearch={props.globalSearch}
      />
    </TableStyles>
    </>
  )
}

export default BrowseRootTable