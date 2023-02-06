// import the gql tagged template function

const { gql } = require('apollo-server-express');

// create our typeDefs
// type Query
// allow us to query thoughts with or without the username parameter

const typeDefs = gql`
  ##  if we want to look up a single thought or user,
  ## we need to know which one we're looking up and thus
  ## necessitate a parameter for us to look up that data.

  ## define that a user will return all the data in their Mongoose model.

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    #  notice the thoughts field is an array of Thought types
    thoughts: [Thought]
    # Notice: friends field is an array that will be populated with data that
    # also adheres to the User type, as a user's friends should follow the
    # same data pattern as that user.
    friends: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    users: [User]
    ## Notice the exclamation point ! after the query parameter data type definitions? That indicates that
    ## for that query to be carried out, that data must exist. Otherwise, Apollo will return an error to
    ## the client making the request and the query won't even reach the resolver function associated with it.
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
`;

// export the typeDefs
module.exports = typeDefs;