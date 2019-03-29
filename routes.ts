import * as express from 'express';

import PostCtrl from './controllers/post';
import UserCtrl from './controllers/user';
import { POSTS, LOGIN, API, USERS, POST, USER, COUNT, ID } from './config/constants/routes';
import { authProtect } from './middlewares/authProtect';

export default function setRoutes(app) {

  const router = express.Router();
  const postCtrl = new PostCtrl();
  const userCtrl = new UserCtrl();

  /****************/
  /* Posts routes */
  /****************/
  router.get(POSTS, authProtect, postCtrl.getAll);
  router.post(POST, postCtrl.insert);
  router.get(`${ POST }${ ID }`, postCtrl.get);
  router.get(`${ POSTS }${ COUNT }`, authProtect, postCtrl.count);
  router.put(`${ POST }${ ID }`, postCtrl.update);
  router.delete(`${ POST }${ ID }`, postCtrl.delete);

  /****************/
  /* Users Routes */
  /****************/
  router.post(LOGIN, userCtrl.login);
  router.get(USERS, userCtrl.getAll);
  router.post(USER, userCtrl.insert);
  router.get(`${ USERS }${ COUNT }`, userCtrl.count);
  router.get(`${ USER }${ ID }`, userCtrl.get);
  router.put(`${ USER }${ ID }`, userCtrl.update);
  router.delete(`${ USER }${ ID }`, userCtrl.delete);

  app.use(API, router);
}
