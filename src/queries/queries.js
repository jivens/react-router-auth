import { gql } from 'apollo-boost';

export const getUserToken = gql`
  query($email: String!, $password: String!) {
    loginUser_Q(email: $email, password: $password) {
      password
    }
  }
`;

export const getUserFromToken = gql`
  query {
    getUserFromToken_Q {
      id
      username
      first
      last
      email
      password
      roles {
        role_code
      }
    }
  }
`;

export const addUserMutation = gql`
  mutation($first: String!, $last: String!, $username: String!, $email: String!, $password: String!) {
    addUser_M(first: $first, last: $last, username: $username, email: $email, password: $password) {
      id
      first
      last
      username
      email
      password
      roles
    }
  }
`;

export const insertAffixMutation = gql`
  mutation insert_an_affix($editnote: String, $english: String!, $link: String, $nicodemus: String!, $page: String, $salish: String, $type: Int!) {
    insert_affixes_one(object: {prevId: null, editnote: $editnote, english: $english, link: $link, nicodemus: $nicodemus, page: $page, salish: $salish, type: $type}) {
      activeByActive {
        value
      }
      createdAt
      editnote
      english
      id
      link
      nicodemus
      page
      prevId
      salish
      affix_type {
        value
      }
      updatedAt
      userId
    }
  }
`;

export const insertRootMutation = gql`
  mutation insert_a_root($cognate: String = "", $crossref: String = "", $editnote: String!, $english: String = "", $grammar: String = "", $nicodemus: String = "", $number: Int = 10, $salish: String = "", $sense: String = "", $symbol: String = "", $variant: String = "", $root: String = "") {
    insert_roots_one(object: {cognate: $cognate, crossref: $crossref, editnote: $editnote, english: $english, grammar: $grammar, nicodemus: $nicodemus, number: $number, salish: $salish, sense: $sense, symbol: $symbol, variant: $variant, root: $root}) {
      activeByActive {
        value
      }
      cognate
      createdAt
      crossref
      editnote
      english
      grammar
      id
      nicodemus
      number
      prevId
      salish
      sense
      symbol
      updatedAt
      variant
      root
    }
  }
  `;

export const getAffixByIdQuery = gql`
  query GetAffixById($id: Int!) {
    affixes_by_pk(id: $id) {
      editnote
      createdAt
      id
      english
      link
      nicodemus
      page
      prevId
      salish
      updatedAt
      user {
        username
      }
      affix_type {
        value
        id
      }
      activeByActive {
        value
        id
      }
    }
  }
`;

export const getRootByIdQuery = gql`
  query GetRootById($id: Int!) {
    roots_by_pk(id: $id) {
      editnote
      createdAt
      updatedAt
      id
      english
      grammar
      nicodemus
      number
      root
      salish
      sense
      symbol
      crossref
      cognate
      variant
      user {
        username
      }
      activeByActive {
        value
        id
      }
      prevId
    }
  }
`

export const updateAffixMutation = gql`
  mutation update_an_affix($id: Int!, $editnote: String, $english: String, $link: String, $nicodemus: String, $page: String, $salish: String, $type: Int) {
    update_affixes_by_pk(pk_columns: {id: $id}, _set: {active: 2}) {
      active
    }
    insert_affixes_one(object: {prevId: $id, editnote: $editnote, english: $english, link: $link, nicodemus: $nicodemus, page: $page, salish: $salish, type: $type}) {
      activeByActive {
        value
      }
      createdAt
      editnote
      english
      id
      link
      nicodemus
      page
      prevId
      salish
      affix_type {
        value
      }
      updatedAt
      userId
    }
  }
`;

export const updateRootMutation = gql`
  mutation update_a_root($id: Int!, $root: String = "", $salish: String = "", $editnote: String = "", $english: String = "", $cognate: String = "", $nicodemus: String = "") {
    update_roots_by_pk(pk_columns: {id: $id}, _set: {active: 2}) {
      active
    }
    insert_roots_one(object: {prevId: $id, root: $root, salish: $salish, editnote: $editnote, english: $english, cognate: $cognate, nicodemus: $nicodemus}) {
      activeByActive {
        value
      }
      createdAt
      updatedAt
      editnote
      english
      id
      nicodemus
      prevId
      root
      salish
      cognate
    }
  }
`

export const deleteAffixMutation = gql`
  mutation($id: Int!) {
    delete_affixes_by_pk(id: $id) {
      id
    }
  }
`;

export const deleteRootMutation = gql`
  mutation delete_a_root($id: Int!, $editnote: String!) {
    update_roots_by_pk(pk_columns: {id: $id}, _set: {active: 2, editnote: $editnote}) {
      createdAt
      root
      updatedAt
      prevId
      english
      salish
      nicodemus
      id
      editnote
      active
      cognate
      userId
    }
  }
`

export const updateUserMutation = gql`
  mutation($first: String!, $last: String!, $username: String!, $email: String!, $password: String!) {
    updateUser_M(first: $first, last: $last, username: $username, email: $email, password: $password) {
      id
      first
      last
      username
      email
      password
      roles
    }
  }
`;

export const getUsersQuery = gql`
    query($limit: Int, $offset: Int) {
      users_Q(limit: $limit, offset: $offset) {
        id
        first
        last
        username
        password
        email
      }
    }
`;

export const getUsernamesQuery = gql`
    query {
      users {
        username
      }
    }
`;


export const getAffixTypesQuery = gql`
    query {
      affix_types {
        value
        id
      }
    }
`;


// need aggregate permission to get the total count
export const getAffixesQuery = gql`
  query getAffixesQuery($limit: Int, $offset: Int, $affix_order: [affixes_order_by!], $where: affixes_bool_exp) {
    affixes_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    affixes(limit: $limit, offset: $offset, where: $where, order_by: $affix_order) {
      english
      nicodemus
      createdAt
      editnote
      link
      page
      salish
      affix_type {
        value
      }
      updatedAt
      id
      user {
        username
      }
    }
  }
  `;

export const getAnonAffixesQuery = gql`
  query getAnonAffixesQuery($limit: Int, $offset: Int, $affix_order: [affixes_order_by!], $where: affixes_bool_exp) {
    affixes_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    affixes(limit: $limit, offset: $offset, where: $where, order_by: $affix_order) {
      english
      nicodemus
      createdAt
      link
      page
      salish
      affix_type {
        value
      }
      updatedAt
      id
    }
  }
  `;

export const getRootsQuery = gql`
  query getRootsQuery($where: roots_bool_exp = {}, $limit: Int = 10, $offset: Int = 10, $root_order: [roots_order_by!] = {}) {
    roots_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    roots(where: $where, limit: $limit, offset: $offset, order_by: $root_order) {
      cognate
      createdAt
      crossref
      editnote
      english
      grammar
      id
      nicodemus
      number
      root
      salish
      sense
      symbol
      updatedAt
      variant
      user {
        username
      }
    }
  }
  `;
  
export const getAnonRootsQuery = gql`
  query getAnonRootsQuery($where: roots_bool_exp = {}, $limit: Int = 10, $offset: Int = 10, $root_order: [roots_order_by!] = {}) {
    roots_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    roots(where: $where, limit: $limit, offset: $offset, order_by: $root_order) {
      cognate
      createdAt
      crossref
      editnote
      english
      grammar
      id
      nicodemus
      number
      root
      salish
      sense
      symbol
      updatedAt
      variant
    }
  }
    `;
    
  export const getAffixHistoryByIdQuery = gql`
    query affixHistoryByIdQuery($original: jsonb!, $table_name: String!) {
      audit_log(where: {table_name: {_eq: $table_name}, original: {_contains: $original}}, order_by: {action_tstamp_clk: asc}) {
        action
        action_tstamp_clk
        action_tstamp_stm
        action_tstamp_tx
        application_name
        diff
        id
        original
        schema_name
        session_user
        table_name
        application_user
        client_addr
        client_port
        client_query
        relid
        statement_only
        transaction_id
      }
    }
  `;
