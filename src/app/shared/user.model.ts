export interface User {
  twitterID: string;
  username: string;
}

export interface Credentials {
  loggedIn: boolean;
  user: User;
}