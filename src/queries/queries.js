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
  {
    users_Q {
      id
      first
      last
      username
      password
      email
    }
  }
`;