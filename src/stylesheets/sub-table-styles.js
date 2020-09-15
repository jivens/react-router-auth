import styled from 'styled-components'

const SubTableStyles = styled.div`
   table {
    overflow: auto;
    display: block;
    width: 100%;
    tr {
      :nth-child(even) {
        background-color: #f5f5f5;
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
      }
    }
  }

  .pagination {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .buttons {
    display: flex;
  }

  .columnToggle {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin: .5rem;
  }

  .toggle {
    margin: 1rem;
  }
`

export default SubTableStyles