import { GraphQLObjectType } from "graphql";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: () => ({}),
});

export default QueryType;
