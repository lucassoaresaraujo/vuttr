import faker from 'faker';
import { factory } from 'factory-girl';

import Tool from '../src/app/models/Tool';
import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(6),
});

factory.define('InvalidUser', User, {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(3),
});

factory.define('Tool', Tool, {
  title: faker.name.title(),
  link: faker.internet.url(),
  description: faker.lorem.words(10),
  tags: new Array(2).fill(null).map(() => faker.random.word()),
});

factory.define('InvalidTool', Tool, {
  title: faker.name.title(),
  link: faker.internet.url(),
  description: faker.lorem.words(10),
});

export default factory;
