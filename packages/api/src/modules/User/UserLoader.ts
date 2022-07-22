import { User } from "./models/User";

export async function getUsers() {
  const users = await User.find();
  return users;
}

export async function getUser(id: string) {
  const user = await User.findOne({ _id: id });
  return user;
}
