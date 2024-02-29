import { HydratedDocument, model, Schema } from 'mongoose';
import User from './User';
import { Post } from '../types';

const PostSchema = new Schema<Post>({
  user: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'User',
    validate: {
      validator: async (value: Schema.Types.ObjectId) => User.findById(value),
      message: 'Users is not found!',
    },
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<Post>) {
        if (this.description || this.image) {
          return true;
        }
        return !(!this.description && !this.image);
      },
      message: 'None description or image are not provided',
    },
  },
  description: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<Post>) {
        if (this.description || this.image) {
          return true;
        }
        return !(!this.description && !this.image);
      },
      message: 'None description or image are not provided',
    },
  },
  datetime: Schema.Types.Date,
});

const Post = model('Post', PostSchema);
export default Post;
