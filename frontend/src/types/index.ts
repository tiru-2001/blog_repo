interface IUser {
  _id: string;
  name: string;
  email: string;
  blogs?: IBlog[];
}
interface BlogState {
  blogs: IBlog[];
  loading: boolean;
  blogDetail: IBlog | null;
  error: string | null;
}
interface AuthState {
  user: IUser | null;
  userBlogs: IBlog[];
  loading: boolean;
  sessionStatus: "idle" | "checking" | "authenticated" | "unauthenticated";
  error: string | null;
  isUserRegistered: boolean;
  registeredError: string | null;
  loginError: string | null;
  justLoggedIn: boolean;
}
interface IBlog {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}
export type { IUser, IBlog, BlogState, AuthState };
