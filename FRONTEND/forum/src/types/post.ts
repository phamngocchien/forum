export default interface IPost {
  _id?: string;
  title: string;
  content: string;
  category: string;
  user: string;
  tag: [];
  status: boolean;
  type: string;
  vote: string;
  view: [];
  createAt?: Date;
  updateAt?: Date;
  isFinish: boolean;
}
