import { Router } from 'express';
import path from 'path';

import authMiddleware from './app/middlewares/auth';

import ToolController from './app/controllers/ToolController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import validateSessionStore from './app/validators/SessionStore';
import validateToolStore from './app/validators/ToolStore';
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';

const routes = new Router();

if (process.env.NODE_ENV === 'development') {
  routes.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'docs', 'index.html'));
  });
}

routes.post('/users', validateUserStore, UserController.store);

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/tools', ToolController.index);
routes.post('/tools', validateToolStore, ToolController.store);
routes.delete('/tools/:id', ToolController.delete);

export default routes;
