import 'dotenv/config'; //carrega todas as variaveis criadas no arquivo .env e adicona elas em uma variavel global do node: process.env = DB_HOST

import express from 'express';
import cors from 'cors';

import routes from './routes';

import './database'; //vai pegar o index.js automaticamente

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  public middlewares(): void {
    this.server.use(express.json());
  }

  public routes(): void {
    this.server.use(cors());
    this.server.use(routes);
  }
}

export default new App().server;
