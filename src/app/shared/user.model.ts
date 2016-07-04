export interface User {
  twitterID: string;
}

export interface Credentials {
  loggedIn: boolean;
  user: User;
}