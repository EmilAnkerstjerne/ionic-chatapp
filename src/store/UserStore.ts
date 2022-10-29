import { Store } from "pullstate";

type User = {
  email?: string;
  id?: string;
  aud?: string;
  role?: string;
}
export const UserStore = new Store({
  user: {} as User,
});