import { User } from "./models/User";

export async function getUsers() {
  const users = await User.find();
  return users;
}
