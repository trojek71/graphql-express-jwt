import { gql } from 'apollo-server-express';

const typeDefs = gql`
directive @auth(requires: Role!,) on FIELD_DEFINITION

enum Role {
  admin
  user
}

  type Auth {
    id: ID
    username: String
    token: String
  }

  type User {
    id: ID
    username: String
    password: String
    articles: [Article]
    role:Role
  }

  type Article {
    id: ID
    text: String
    user: User
  }

  type Query {
    readUsers: [User]
    readUser(id: ID!): User
    readArticles: [Article]
  }

  type Mutation {
    signup(username: String!, password: String!, role: Role!): Auth @auth(requires: admin)
    login(username: String!, password: String!): Auth
    createArticle(text: String!, user: String!): Article
  }
`;

export default typeDefs;