export interface User {
  _id: string;
  username: string;
  password: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface Post {
  id_post: string;
  title: string,
  username: string;
  datetime: Date;
  image: string | null;
}

export interface CreatePost {
  title: string,
  description: string;
  image: File | null;
}

export interface PostOne {
  id_post: string;
  title: string,
  username: string;
  datetime: Date;
  description: string | null;
  image: string | null;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string,
      message: string,
    }
  },
  message: string;
  name: string;
  _message:string;
}

export interface GlobalError {
  error: string;
}

export interface Comment {
  _id: string;
  user: {
    username: string
  };
  post: string;
  body: string;
}

export interface CommentMutation {
  post: string;
  body: string;
}