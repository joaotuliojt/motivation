import { fromGlobalId, nodeDefinitions } from "graphql-relay";
import { getUser } from "../User/UserLoader";

const { nodeField, nodeInterface, nodesField } = nodeDefinitions(
  (globalId) => {
    const { id, type } = fromGlobalId(globalId);
    if (type === "User") {
      return getUser(id);
    }
    return null;
  },
  (obj) => {
    if (obj.email) {
      console.log(typeof obj);
      return "User";
    }
    return undefined;
  }
);

export { nodeInterface, nodeField, nodesField };
