import mongoose, { Schema, Types } from 'mongoose';
import User from './User';
import Post from './Post';
import { Comment } from '../types';

const commentSchema = new Schema<Comment>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'Users does not exist!',
    },
  },
  post: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
    validate: {
      validator: async (value: Types.ObjectId) => Post.findById(value),
      message: 'AllPost is not found!',
    },
  },
  body: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
