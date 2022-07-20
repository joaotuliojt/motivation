import { GraphQLObjectType } from "graphql";

const QueryType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root of ... mutations",
  fields: () => ({}),
});

export default QueryType;
