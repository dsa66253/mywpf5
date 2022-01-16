import { gql } from "@apollo/client";
const CREATE_USER_MUTATION = gql`
  mutation createUser($username: String, $email: String, $password: String) {
    createUser(username: $username, email: $email, password: $password) {
      username
      success
      detail
    }
  }
`;
const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $author: String
    $title: String
    $body: String
    $type: String
    $date: String
  ) {
    createPost(
      author: $author
      title: $title
      body: $body
      type: $type
      date: $date
    ) {
      id
      author {
        email
        picture
      }
      title
      body
      type
      date
    }
  }
`;
const UPDATE_USER_MUTATION = gql`
  mutation updateUser($username:String, $email: String, $studentID:String, 
    $picture:String, $friends:[String], $interest:String, 
    $field:String, $skill:String, $position:String) {
    updateUser(username: $username, email: $email, studentID:$studentID,
    picture:$picture, friends:$friends, interest:$interest, 
    field:$field, skill:$skill, position:$position) {
      username
      success
      detail
    }
  }
`;
const EDIT_POST_MUTATION = gql`
  mutation editPost($id: ID, $title: String, $body: String) {
    editPost(id: $id, title: $title, body: $body) {
      title
      id
      body
    }
  }
`;
const DELETE_POST_MUTATION = gql`
  mutation deletePost($id: ID, $username: String) {
    deletePost(id: $id, username: $username) {
      success
      detail
    }
  }
`;

export { CREATE_USER_MUTATION, CREATE_POST_MUTATION, UPDATE_USER_MUTATION, EDIT_POST_MUTATION, DELETE_POST_MUTATION };
