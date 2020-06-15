"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Arquivo que realizará a conexão com o banco e carregará os models
var _mongodb = require('mongodb');

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Medicine = require('../app/models/Medicine'); var _Medicine2 = _interopRequireDefault(_Medicine);
var _Food = require('../app/models/Food'); var _Food2 = _interopRequireDefault(_Food);
var _PhysicalActivity = require('../app/models/PhysicalActivity'); var _PhysicalActivity2 = _interopRequireDefault(_PhysicalActivity);
var _DayWeek = require('../app/models/DayWeek'); var _DayWeek2 = _interopRequireDefault(_DayWeek);

const models = [
  _User2.default,
  _Medicine2.default,
  _Food2.default,
  _PhysicalActivity2.default,
  _DayWeek2.default
];

class Database {
   constructor() {
    this.mongo();
    this.initModels();
  }

   mongo() {
    _mongodb.MongoClient.connect(process.env.MONGO_URL, function (err, db) {
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

exports. default = new Database();
