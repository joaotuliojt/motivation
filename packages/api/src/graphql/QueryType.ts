import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import UserType from "../modules/User/UserType";

import * as UserLoader from "../modules/User/UserLoader";
import { nodeField, nodesField } from "../modules/node/nodeinterface";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        const data = await UserLoader.getUsers();
        return data;
      },
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }) => {
        const data = await UserLoader.getUser(id);
        return data;
      },
    },
    node: nodeField,
    nodes: nodesField,
  },
});

export default QueryType;
