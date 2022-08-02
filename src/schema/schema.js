const { gql } = require("apollo-server-express");
const { GraphQLJSON, GraphQLJSONObject } = require("graphql-type-json");

const typeDefs = gql`
  scalar JSON
  scalar JSONObject
  type Cart {
    id: ID
    userId: String
    productId: String
    data: JSONObject
  }

  type Query {
    userCart(userId: String): [Cart]
  }

  type Mutation {
    addUserCartProduct(userId: String, productId: String): Cart
    deleteUserCartProduct(id: String): Cart
    deleteUserCartProductList(list: [ID]): Cart
  }
`;

module.exports = typeDefs;
