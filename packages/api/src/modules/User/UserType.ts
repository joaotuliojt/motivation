import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLScalarType, GraphQLList } from "graphql";
import { globalIdField, connectionDefinitions, connectionArgs, connectionFromArray } from "graphql-relay";
import { getMotivations } from "../Motivation/MotivationLoader";
import MotivationType, { MotivationConnection } from "../Motivation/MotivationType";
import { nodeInterface } from "../node/nodeinterface";

console.log(MotivationConnection);
const UserType = new GraphQLObjectType({
  name: "User",
  description: "User Type",
  interfaces: [nodeInterface],
  fields: () => ({
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
      type: MotivationConnection,
      args: connectionArgs,
      resolve: async (user, args) => {
        const data = await getMotivations(user._id);
        return connectionFromArray([...data], args);
      },
    },
  }),
});

const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  nodeType: UserType,
  name: "User",
});

export { UserConnection, UserEdge };

export default UserType;
