"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongodb = require('mongodb');

var _AbstractModel = require('../../core/AbstractModel'); var _AbstractModel2 = _interopRequireDefault(_AbstractModel);

 class DayWeek extends _AbstractModel2.default {
   static __initStatic() {this.collectionName = 'day_week'}

   static async init() {
    const collectionName = this.collectionName;

    _mongodb.MongoClient.connect(process.env.MONGO_URL, function (err, db) {
      if (err) throw err;
      var dbo = db.db(process.env.DATABASE);
      dbo.createCollection(collectionName, function (err, res) {
        if (err) throw err;
        console.log(`${collectionName}Collection created!`);
        db.close();
      });
    });

    const content = await this.find();

    if (!content.length) {
      this.createList(DEFAULT_VALUES);
    }
  }
} DayWeek.__initStatic(); exports.default = DayWeek;

const DEFAULT_VALUES = [
  {
    name: 'Domingo',
    order: 0
  },
  {
    name: 'Segunda-Feira',
    order: 1
  },
  {
    name: 'Terça-Feira',
    order: 2
  },
  {
    name: 'Quarta-Feira',
    order: 3
  },
  {
    name: 'Quinta-Feira',
    order: 4
  },
  {
    name: 'Sexta-Feira',
    order: 5
  },
  {
    name: 'Sábado',
    order: 6
  }
];
