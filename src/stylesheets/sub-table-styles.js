import styled from 'styled-components'

const SubTableStyles = styled.div`
   table {
    overflow: auto;
    display: block;
    width: 100%;
    tr {
      background: #f5f5f5;
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
      }
    }
  }
`

export default SubTableStyles