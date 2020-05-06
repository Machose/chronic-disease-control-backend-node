import 'dotenv/config'; //carrega todas as variaveis criadas no arquivo .env e adicona elas em uma variavel global do node: process.env = DB_HOST

import express from 'express';

import routes from './routes';

import './database'; //vai pegar o index.js automaticamente

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
