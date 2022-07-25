import { GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { nodeInterface } from "../node/nodeinterface";
import UserType from "../User/UserType";

const MotivationType = new GraphQLObjectType({
  name: "Motivation",
  description: "Motivation Type",
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField("Motivation"),
    sentence: {
      type: GraphQLString,
    },
    author: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
      resolve: (source) => null,
    },
  },
});

const { connectionType: MotivationConnection, edgeType: MotivationEdge } = connectionDefinitions({
  nodeType: MotivationType,
  name: "Motivation",
});

export { MotivationConnection, MotivationEdge };

export default MotivationType;
