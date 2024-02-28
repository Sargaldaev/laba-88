import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Post from '../models/Post';
import Comment from '../models/Comment';

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;
  try {
    const { post, body } = req.body;
    const postEx = await Post.find({ _id: post });
    if (!postEx) return res.status(404).send('No Post!');

    const commentData = {
      user: user._id,
      post: post,
      body: body,
    };
    const comment = new Comment(commentData);

    await comment.save();

    const commentResponse = {
      user: user.username,
      post: post,
      body: body,
    };
    return res.send(commentResponse);
  } catch {
    return res.sendStatus(500);
  }
});

export default commentsRouter;
