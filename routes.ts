import * as express from 'express';

import PostCtrl from './controllers/post';
import UserCtrl from './controllers/user';
import { POSTS, LOGIN, API, USERS, POST, USER, COUNT, ID } from './config/constants/routes';
import { protectedRoute } from './middlewares/ProtectedRoute';

export default function setRoutes(app) {

  const router = express.Router();
  const postCtrl = new PostCtrl();
  const userCtrl = new UserCtrl();

  // Posts
  router.route(POSTS).get(postCtrl.getAll);
  router.route(POST).post(postCtrl.insert);
  router.route(`${ POSTS }${ COUNT }`).get(postCtrl.count);
  router.route(`${ POST }${ ID }`).get(postCtrl.get);
  router.route(`${ POST }${ ID }`).put(postCtrl.update);
  router.route(`${ POST }${ ID }`).delete(postCtrl.delete);

  // Users
  router.route(LOGIN).post(userCtrl.login);
  router.route(USERS).get(userCtrl.getAll);
  router.route(USER).post(userCtrl.insert);
  router.route(`${ USERS }${ COUNT }`).get(userCtrl.count);
  router.route(`${ USER }${ ID }`).get(userCtrl.get);
  router.route(`${ USER }${ ID }`).put(userCtrl.update);
  router.route(`${ USER }${ ID }`).delete(userCtrl.delete);
  protectedRoute(router);
  // Apply the routes to our application with the prefix /api
  app.use(API, router);
}
