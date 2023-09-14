const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Product {
    _id: ID
    name: String
    description: String
    price: Float
    imageUrl: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    products: [Product]
    product(_id: ID!): Product
    orders(userId: ID): [Order]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
  }
`;

module.exports = typeDefs;
