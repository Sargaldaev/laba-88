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
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores assumenda autem beatae corporis\n' +
        '          delectus dolor doloremque dolorum eaque excepturi expedita facere, impedit in ipsa libero maxime nam nesciunt\n' +
        '          omnis perferendis quae reiciendis ut vitae voluptatibus! Architecto, atque delectus deleniti dicta ea error\n' +
        '          eveniet excepturi expedita iusto laborum, nam nobis perspiciatis possimus quas quidem quis ratione recusandae\n' +
        '          voluptatum? Harum impedit ipsa necessitatibus nobis quibusdam reiciendis velit vero voluptatem! Ab accusamus\n' +
        '          accusantium alias aliquam aliquid atque beatae blanditiis delectus dolore doloremque earum eius harum in\n' +
        '          inventore iure minima molestiae, natus neque, quia quod reiciendis rem repellendus saepe sequi ullam?\n' +
        '          Expedita, recusandae!',
      datetime: new Date().toISOString(),
    },
    {
      user: user._id,
      title: 'AllPost 2',
      image: '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores assumenda autem beatae corporis\n' +
        '          delectus dolor doloremque dolorum eaque excepturi expedita facere, impedit in ipsa libero maxime nam nesciunt\n' +
        '          omnis perferendis quae reiciendis ut vitae voluptatibus! Architecto, atque delectus deleniti dicta ea error\n' +
        '          eveniet excepturi expedita iusto laborum, nam nobis perspiciatis possimus quas quidem quis ratione recusandae\n' +
        '          voluptatum? Harum impedit ipsa necessitatibus nobis quibusdam reiciendis velit vero voluptatem! Ab accusamus\n' +
        '          accusantium alias aliquam aliquid atque beatae blanditiis delectus dolore doloremque earum eius harum in\n' +
        '          inventore iure minima molestiae, natus neque, quia quod reiciendis rem repellendus saepe sequi ullam?\n' +
        '          Expedita, recusandae!',
      datetime: new Date().toISOString(),
    },
    {
      user: admin._id,
      title: 'AllPost 3',
      image: '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores assumenda autem beatae corporis\n' +
        '          delectus dolor doloremque dolorum eaque excepturi expedita facere, impedit in ipsa libero maxime nam nesciunt\n' +
        '          omnis perferendis quae reiciendis ut vitae voluptatibus! Architecto, atque delectus deleniti dicta ea error\n' +
        '          eveniet excepturi expedita iusto laborum, nam nobis perspiciatis possimus quas quidem quis ratione recusandae\n' +
        '          voluptatum? Harum impedit ipsa necessitatibus nobis quibusdam reiciendis velit vero voluptatem! Ab accusamus\n' +
        '          accusantium alias aliquam aliquid atque beatae blanditiis delectus dolore doloremque earum eius harum in\n' +
        '          inventore iure minima molestiae, natus neque, quia quod reiciendis rem repellendus saepe sequi ullam?\n' +
        '          Expedita, recusandae!',
      datetime: new Date().toISOString(),
    },
    {
      user: admin._id,
      title: 'AllPost 4',
      image: '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores assumenda autem beatae corporis\n' +
        '          delectus dolor doloremque dolorum eaque excepturi expedita facere, impedit in ipsa libero maxime nam nesciunt\n' +
        '          omnis perferendis quae reiciendis ut vitae voluptatibus! Architecto, atque delectus deleniti dicta ea error\n' +
        '          eveniet excepturi expedita iusto laborum, nam nobis perspiciatis possimus quas quidem quis ratione recusandae\n' +
        '          voluptatum? Harum impedit ipsa necessitatibus nobis quibusdam reiciendis velit vero voluptatem! Ab accusamus\n' +
        '          accusantium alias aliquam aliquid atque beatae blanditiis delectus dolore doloremque earum eius harum in\n' +
        '          inventore iure minima molestiae, natus neque, quia quod reiciendis rem repellendus saepe sequi ullam?\n' +
        '          Expedita, recusandae!',
      datetime: new Date().toISOString(),
    },
  );

  await Comment.create(
    {
      user: admin._id,
      post: postThree._id,
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, similique.\n',
    },
    {
      user: user._id,
      post: postThree._id,
      body: 'Hello people!',
    },
    {
      user: user._id,
      post: postOne._id,
      body: 'wow',
    },
    {
      user: admin._id,
      post: postOne._id,
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, similique',
    },
    {
      user: admin._id,
      post: postFour._id,
      body: 'my name is John',
    },
    {
      user: user._id,
      post: postFour._id,
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, similique',
    },
    {
      user: admin._id,
      post: postTwo._id,
      body: 'Hello world',
    },
    {
      user: user._id,
      post: postTwo._id,
      body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, similique',
    },
  );

  await db.close();
};

run().catch(console.error);
