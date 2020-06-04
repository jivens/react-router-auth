import { gql } from 'apollo-boost';

export const getUserToken = gql`
query($email: String!, $password: String!) {
  loginUser_Q(email: $email, password: $password) {
    password
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