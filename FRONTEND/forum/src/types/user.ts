export default interface IUser {
  _id?: string;
  name?: string;
  msv?: string;
  password?: string;
  role?: string;
  major?: string;
  email?: string;
  facebook?: string;
  github?: string;
  follow?: any[];
  notification?: any[];
  createdAt?: string;
  updatedAt?: string;
}
