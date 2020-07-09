import { gql } from 'apollo-boost';

export const getUserToken = gql`
query($email: String!, $password: String!) {
  loginUser_Q(email: $email, password: $password) {
    password
  }
}
`;

export const insertAffixMutation = gql`
  mutation AddAffix {
    insert_affixes_one(object: { editnote: "editnote", english: "english", link: "link",  nicodemus: "nicodemus", page: "page", salish: "salish", type: "type"} ){
      active
      createdAt
      editnote
      english
      id
      link
      nicodemus
      page
      prevId
      salish
      type
      updatedAt
      userId
    }
  }
`;

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

export const getActiveValuesQuery = gql`
    query {
      actives {
        value
      }
    }
`;

export const getAffixTypesQuery = gql`
    query {
      affix_types {
        value
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
    activeByActive {
      value
    }
    english
    nicodemus
    createdAt
    editnote
    link
    page
    prevId
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