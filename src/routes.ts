import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MedicineController from './app/controllers/MedicineController';
import FoodController from './app/controllers/FoodController';
import PhysicalActivityController from './app/controllers/PhysicalActivityController';
import DayWeekController from './app/controllers/DayWeekController';
import MedicineRoutineController from './app/controllers/MedicineRoutineController';
import PhysicalActivityRoutineController from './app/controllers/PhysicalActivityRoutineController';
import FoodRoutineController from './app/controllers/FoodRoutineController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

/** Controle de login - Acesso e cadastro */
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware); //Middleware que impede a utilização do app sem a autenticação

/** Rotas da aplicação */
/** User */
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);

/** Medicine */
routes.post('/medicines', MedicineController.store);
routes.get('/medicines', MedicineController.index);
routes.get('/medicines/:id', MedicineController.show);
routes.put('/medicines/:id', MedicineController.update);
routes.delete('/medicines/:id', MedicineController.delete);

/** Food */
routes.post('/foods', FoodController.store);
routes.get('/foods', FoodController.index);
routes.get('/foods/:id', FoodController.show);
routes.put('/foods/:id', FoodController.update);
routes.delete('/foods/:id', FoodController.delete);

/** PhysicalActivity */
routes.post('/physicalActivities', PhysicalActivityController.store);
routes.get('/physicalActivities', PhysicalActivityController.index);
routes.get('/physicalActivities/:id', PhysicalActivityController.show);
routes.put('/physicalActivities/:id', PhysicalActivityController.update);
routes.delete('/physicalActivities/:id', PhysicalActivityController.delete);

/** Days of the Week */
routes.get('/daysWeek', DayWeekController.index);

/** MedicineRoutine */
routes.post('/medicineRoutines', MedicineRoutineController.store);
routes.get('/medicineRoutines', MedicineRoutineController.index);
routes.delete('/medicineRoutines/:id', MedicineRoutineController.delete);

/** FoodRoutine */
routes.post('/foodRoutines', FoodRoutineController.store);
routes.get('/foodRoutines', FoodRoutineController.index);
routes.delete('/foodRoutines/:id', FoodRoutineController.delete);

/** PhysicalActivityRoutine */
routes.post(
  '/physicalActivitiesRoutines',
  PhysicalActivityRoutineController.store
);
routes.get(
  '/physicalActivitiesRoutines',
  PhysicalActivityRoutineController.index
);
routes.delete(
  '/physicalActivitiesRoutines/:id',
  PhysicalActivityRoutineController.delete
);

export default routes;
