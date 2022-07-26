import { GraphQLObjectType } from "graphql";
import UserMutations from "../modules/User/mutations";
import MotivationMutations from "../modules/Motivation/mutations";

const QueryType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root of ... mutations",
  fields: {
    ...UserMutations,
    ...MotivationMutations,
  },
});

export default QueryType;
