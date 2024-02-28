import mongoose from 'mongoose';
import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';
import Post from '../models/Post';

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

export default postsRouter