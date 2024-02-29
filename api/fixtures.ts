import mongoose from 'mongoose';
import crypto from 'crypto';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('posts');
    await db.dropCollection('users');
    await db.dropCollection('comments');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user, admin] = await User.create(
    {
      username: 'Triss',
      password: '123',
      token: crypto.randomUUID(),
    },
    {
      username: 'Bob',
      password: '321',
      token: crypto.randomUUID(),
    },
  );

  const [postOne, postTwo, postThree, postFour] = await Post.create(
    {
      user: user._id,
      title: 'AllPost 1',
      image: '',
      description: 'post 1 description',
      datetime: new Date().toISOString(),
    },
    {
      user: user._id,
      title: 'AllPost 2',
      image: '',
      description: 'post 2 description',
      datetime: new Date().toISOString(),
    },
    {
      user: admin._id,
      title: 'AllPost 3',
      image: '',
      description: 'post 3 description',
      datetime: new Date().toISOString(),
    },
    {
      user: admin._id,
      title: 'AllPost 4',
      image: '',
      description: 'post 4 description',
      datetime: new Date().toISOString(),
    },
  );

  await Comment.create(
    {
      user: user._id,
      post: postThree._id,
      body: 'something',
    },
    {
      user: user._id,
      post: postThree._id,
      body: 'Hello people!',
    },
    {
      user: admin._id,
      post: postOne._id,
      body: 'wow',
    },
    {
      user: user._id,
      post: postFour._id,
      body: 'my name is John',
    },
    {
      user: admin._id,
      post: postTwo._id,
      body: 'Hello world',
    },
  );

  await db.close();
};

run().catch(console.error);
