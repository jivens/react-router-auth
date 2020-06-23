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

// need aggregate permission to get the total count
export const getAffixesQuery = gql`
query getAffixesQuery($active: String, $search_str: String, $limit: Int, $offset: Int) {
  affixes_aggregate(where: {_and: [{active: {_eq: $active}}, {_or: [{english: {_like: $search_str}}, {nicodemus: {_like: $search_str}}]}]}, order_by: $affix_order) {
    aggregate {
      count
    }
  }
  affixes(limit: $limit, offset: $offset, where: {_and: [{active: {_eq: $active}}, {_or: [{english: {_like: $search_str}}, {nicodemus: {_like: $search_str}}]}]}) {
    active
    english
    nicodemus
    createdAt
    editnote
    link
    page
    prevId
    salish
    type
    updatedAt
    id
    user {
      username
    }
  }
}
  `;