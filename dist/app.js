"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv/config'); //carrega todas as variaveis criadas no arquivo .env e adicona elas em uma variavel global do node: process.env = DB_HOST

var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

require('./database'); //vai pegar o index.js automaticamente

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(_express2.default.json());
  }

  routes() {
    this.server.use(_routes2.default);
  }
}

exports. default = new App().server;
