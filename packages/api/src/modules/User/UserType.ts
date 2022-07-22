import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLScalarType } from "graphql";
import { globalIdField, connectionDefinitions } from "graphql-relay";
import { nodeInterface } from "../node/nodeinterface";

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User model",
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField("User"),
    _id: {
      type: GraphQLID,
    },
    email: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    createdAt: {
      type: new GraphQLScalarType({ name: "CreatedAt" }),
    },
    updatedAt: {
      type: new GraphQLScalarType({ name: "UpdatedAt" }),
    },
    motivations: {
      type: GraphQLID,
    },
  },
});

const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  nodeType: UserType,
  name: "User",
});

export { UserConnection, UserEdge };

export default UserType;
