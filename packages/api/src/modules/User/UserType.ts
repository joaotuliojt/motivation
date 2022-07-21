import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import { globalIdField, connectionDefinitions } from "graphql-relay";
import { IUser } from "./models/User";

const UserType = new GraphQLObjectType<IUser>({
  name: "User",
  description: "User model",
  fields: {
    id: globalIdField("User"),
    email: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    motivations: {
      type: GraphQLID,
    },
  },
});

const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  nodeType: UserType,
});

export { UserConnection, UserEdge };

export default UserType;
