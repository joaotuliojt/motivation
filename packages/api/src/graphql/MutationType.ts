import { GraphQLObjectType } from "graphql";
import UserMutations from "../modules/User/mutations";

const QueryType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root of ... mutations",
  fields: {
    ...UserMutations,
  },
});

export default QueryType;
