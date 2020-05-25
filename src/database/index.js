//Arquivo que realizará a conexão com o banco e carregará os models
import { MongoClient } from 'mongodb';

import UserModel from '../app/models/User';
import MedicineModel from '../app/models/Medicine';
import FoodModel from '../app/models/Food';

const models = [UserModel, MedicineModel, FoodModel];

class Database {
  constructor() {
    this.mongo();
    this.initModels();
  }

  mongo() {
    MongoClient.connect(process.env.MONGO_URL, function (err, db) {
      if (err) throw err;
      console.log('Database created!');
      db.close();
    });
  }

  initModels() {
    models.forEach((model) => {
      model.init();
    });
  }
}

export default new Database();
