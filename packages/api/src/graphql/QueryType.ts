import { GraphQLObjectType } from "graphql";
import MotivationQueries from "../modules/Motivation/queries";
import UserQueries from "../modules/User/queries";
import { nodeField, nodesField } from "../modules/node/nodeinterface";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: {
    ...MotivationQueries,
    ...UserQueries,
    node: nodeField,
    nodes: nodesField,
  },
});

export default QueryType;
