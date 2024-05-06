export interface IUser {
  id: number;
  email: string;
  events: [];
  participatedEvents: [];
}

export interface IAllUsers {
  users: IUser[];
}
