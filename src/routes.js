import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import authMiddleware from './app/middlewares/auth';

import ToolController from './app/controllers/ToolController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import validateSessionStore from './app/validators/SessionStore';
import validateToolStore from './app/validators/ToolStore';
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';

const routes = new Router();

let bruteForce;

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

if (process.env.NODE_ENV !== 'test') {
  bruteForce = new Brute(bruteStore, { freeRetries: 3 });
} else {
  bruteForce = new Brute(bruteStore, { freeRetries: 1000 });
}

routes.post('/users', validateUserStore, UserController.store);

routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/tools', ToolController.index);
routes.post('/tools', validateToolStore, ToolController.store);
routes.delete('/tools/:id', ToolController.delete);

export default routes;
