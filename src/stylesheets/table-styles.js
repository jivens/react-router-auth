import styled from 'styled-components'

const TableStyles = styled.div`
   table {
    overflow: auto;
    display: block;
    width: 100%;
    border: 1px solid #ddd;
    tr {
      :nth-child(even) {
        background-color: #f8f8f8;
      }
      :nth-child(odd) {
        background-color: #dae5f4;
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid #ddd;
    }
    th {
      border: 0px;
      background: #f5f5f5;
      padding: .5rem;
      text-align: left;
    },
    td {
      margin: 0;
      padding: 0.5rem;
      word-wrap: break-word;
      border-left: 1px solid #ddd;
      }
    }
  }

  .pagination {
    margin-top: 20px;
    margin-bottom: 20px;
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

export default TableStyles