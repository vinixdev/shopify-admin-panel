export interface CommentInterface {
  id: string;
  user: IUser;
  product: object;
  title: string;
  body: string;
  isBuyer: boolean;
  adviceToBuy: number;
  status: number;
  createdAt: string;
}

export interface CommentInterfaceResponse {
  comments: CommentInterface[];
  totalComments: number;
  perPage: number;
}

interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}
