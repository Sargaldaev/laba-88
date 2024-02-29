import { Schema } from 'mongoose';

export interface Post {
  title: string;
  user: Schema.Types.ObjectId;
  comment: Schema.Types.ObjectId;
  datetime: Schema.Types.Date;
  description: string;
  image: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface Comment {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  body: string;
}

export interface PostsAll {
  _id: string;
  user: {
    _id: string;
    username: string;
    token: string;
  };
  title: string;
  description: string;
  datetime: Date;
  image: string | null;
}
