import mongoose from 'mongoose';
import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';
import Post from '../models/Post';
import { PostsAll } from '../types';

const postsRouter = express.Router();

postsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const postData = {
      user: user._id,
      title: req.body.title,
      image: req.file && req.file.filename,
      description: req.body.description,
      datetime: new Date().toISOString(),
    };

    const post = new Post(postData);

    await post.save();

    return res.send(post);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

postsRouter.get('/', async (_, res) => {
  try {
    const posts = await Post.find<PostsAll>()
      .populate({
        path: 'user',
        populate: {
          path: 'username',
        },
      })
      .sort({ datetime: -1 });

    const postsList = posts.map((item) => ({
      id_post: item._id,
      username: item.user.username,
      title: item.title,
      image: item.image,
      datetime: item.datetime,
    }));
    return res.send(postsList);
  } catch {
    return res.sendStatus(500);
  }
});

postsRouter.get('/:id', async (req, res) => {
  try {
    if (req.params.id) {
      const postOne = await Post.findById<PostsAll>(req.params.id).populate({
        path: 'user',
        populate: {
          path: 'username',
        },
      });
      if (!postOne) {
        return res.sendStatus(404);
      }
      const postOneResult = {
        id_post: postOne._id,
        username: postOne.user.username,
        title: postOne.title,
        image: postOne.image,
        description: postOne.description,
        datetime: postOne.datetime,
      };
      return res.send(postOneResult);
    }
  } catch {
    return res.sendStatus(500);
  }
});

export default postsRouter;
