import { Router } from 'express';
import multer from 'multer'
import uploadConfig from './config/upload'

import BoatsController from './controllers/BoatsController';
import OrdersController from './controllers/OrdersController';
import SessionsController from './controllers/SessionsController';
import UsersController from './controllers/UsersController'
//import ensureAuthenticated from './middleawares/ensureAuthenticated';

const routes = Router();
const upload = multer(uploadConfig);

//USERS
routes.get('/users', UsersController.index);
routes.post('/users', upload.single('image'), UsersController.create);
routes.get('/users/:id', UsersController.show);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);
routes.get('/users/orders/:id', UsersController.showOrders);

//BOAT
routes.get('/boats', BoatsController.index);
routes.post('/boats', BoatsController.create);
routes.get('/boats/:id', BoatsController.show);
routes.delete('/users/:id', BoatsController.delete);
routes.get('/boats/orders/:id', BoatsController.showOrders);

//ORDER
routes.get('/orders', OrdersController.index);
routes.post('/orders', OrdersController.create);
routes.get('/orders/:id', OrdersController.show);
routes.put('/orders/:id', OrdersController.update);
routes.delete('/users/:id', OrdersController.delete);

routes.post('/sessions', SessionsController.create);
routes.get('/sessions', SessionsController.index);
routes.delete('/sessions', SessionsController.delete);

export default routes;