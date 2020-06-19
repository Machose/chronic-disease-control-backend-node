//Arquivo que realizará a conexão com o banco e carregará os models
import { MongoClient } from 'mongodb';

import UserModel from '../app/models/User';
import MedicineModel from '../app/models/Medicine';
import FoodModel from '../app/models/Food';
import PhysicalActivityModel from '../app/models/PhysicalActivity';
import DayWeekModel from '../app/models/DayWeek';
import MedicineRoutineModel from '../app/models/MedicineRoutine';
import FoodRoutineModel from '../app/models/FoodRoutine';
import PhysicalActivityRoutineModel from '../app/models/PhysicalActivityRoutine';

const models = [
  UserModel,
  MedicineModel,
  FoodModel,
  PhysicalActivityModel,
  DayWeekModel,
  MedicineRoutineModel,
  FoodRoutineModel,
  PhysicalActivityRoutineModel
];

class Database {
  public constructor() {
    this.mongo();
    this.initModels();
  }

  public mongo(): void {
    MongoClient.connect(process.env.MONGO_URL, function (err, db) {
      if (err) throw err;
      console.log('Database created!');
      db.close();
    });
  }

  public initModels(): void {
    models.forEach((model) => {
      model.init();
    });
  }
}

export default new Database();
