"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongodb = require('mongodb');
var _AbstractModel = require('../../core/AbstractModel'); var _AbstractModel2 = _interopRequireDefault(_AbstractModel);










 class MedicineRoutineModel extends _AbstractModel2.default {
   static __initStatic() {this.collectionName = 'medicine_routine'}

   static async find(query = {}) {
    const collectionName = this.collectionName;

    const client = await _mongodb.MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    try {
      const dataBase = client.db(process.env.DATABASE);

      const myPromise = () => {
        return new Promise((resolve, reject) => {
          dataBase
            .collection(collectionName)
            .aggregate([
              { $match: query },
              {
                $project: {
                  medicine_id: { $toObjectId: '$medicine_id' },
                  day_week_id: { $toObjectId: '$day_week_id' },
                  schedule: 1
                }
              },
              {
                $lookup: {
                  from: 'medicine',
                  localField: 'medicine_id',
                  foreignField: '_id',
                  as: 'medicine'
                }
              },
              {
                $lookup: {
                  from: 'day_week',
                  localField: 'day_week_id',
                  foreignField: '_id',
                  as: 'day_week'
                }
              }
            ])
            .sort({ schedule: 1 })
            .toArray(function (err, res) {
              err ? reject(err) : resolve(res);
            });
        });
      };

      const result = await myPromise();

      client.close();

      return result;
    } catch (err) {
      return err;
    }
  }
} MedicineRoutineModel.__initStatic(); exports.default = MedicineRoutineModel;
