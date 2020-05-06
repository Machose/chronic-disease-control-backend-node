import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/** Controle de login - Acesso e cadastro */
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware); //Middleware que impede a utilização do app sem a autenticação

/** Rotas da aplicação */
/** User */
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);

export default routes;
