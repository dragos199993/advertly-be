import * as express from 'express';
import PostCtrl from './controllers/post';
import UserCtrl from './controllers/user';
import { POSTS, LOGIN, API, USERS, POST, USER, COUNT, ID, PROFILE } from './config/constants/routes';
import { authProtect, hasAuthorization } from './middlewares/authProtect';
import { postValidator, userValidator } from './helpers/validators';

export default function setRoutes(app) {

  const router = express.Router();
  const postCtrl = new PostCtrl();
  const userCtrl = new UserCtrl();

  /****************/
  /* Posts routes */
  /****************/
  router.get(POSTS, postCtrl.getAll);
  router.post(POST, postValidator(), postCtrl.insert);
  router.get(`${ POST }${ ID }`, postCtrl.get);
  router.get(`${ POSTS }${ COUNT }`, postCtrl.count);
  router.put(`${ POST }${ ID }`, postCtrl.update);
  router.delete(`${ POST }${ ID }`, postCtrl.remove);

  /****************/
  /* Users Routes */
  /****************/
  router.post(LOGIN, userCtrl.login);
  router.get(USERS, userCtrl.getAll);
  router.post(USER, userValidator(), userCtrl.insert);
  router.get(`${ USERS }${ COUNT }`, userCtrl.count);
  router.get(`${ USER }${ ID }`, userCtrl.get);
  router.get(`${ PROFILE }${ ID }`, [authProtect, hasAuthorization], userCtrl.get);
  router.put(`${ USER }${ ID }`, userCtrl.update);
  router.delete(`${ USER }${ ID }`, userCtrl.remove);
  // middlware example: [authProtect, hasAuthorization]
  app.use(API, router);
}
