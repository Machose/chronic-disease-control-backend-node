"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _MedicineController = require('./app/controllers/MedicineController'); var _MedicineController2 = _interopRequireDefault(_MedicineController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();

/** Controle de login - Acesso e cadastro */
routes.post('/sessions', _SessionController2.default.store);
routes.post('/users', _UserController2.default.store);

routes.use(_auth2.default); //Middleware que impede a utilização do app sem a autenticação

/** Rotas da aplicação */
/** User */
routes.get('/users', _UserController2.default.index);
routes.get('/users/:id', _UserController2.default.show);
routes.put('/users/:id', _UserController2.default.update);

/** Medicine */
routes.post('/medicines', _MedicineController2.default.store);
routes.get('/medicines', _MedicineController2.default.index);
routes.put('/medicines/:id', _MedicineController2.default.update);

exports. default = routes;
