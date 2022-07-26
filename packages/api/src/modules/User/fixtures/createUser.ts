import { User } from "../models/User";

export async function createUser() {
  const i = (await User.countDocuments()) + 1;
  const user = await User.create({
    name: `user#${i}`,
    email: `user#${i}@email.com`,
    password: `password#${i}`,
  });
  return user;
}
