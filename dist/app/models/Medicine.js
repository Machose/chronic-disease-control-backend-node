"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongodb = require('mongodb');

class MedicineModel {
  constructor(name, email) {
    this.init();

    this.name = name;
    this.email = email;
  }

  static init() {
    _mongodb.MongoClient.connect(process.env.MONGO_URL, function (err, db) {
      if (err) throw err;
      var dbo = db.db(process.env.DATABASE);
      dbo.createCollection('medicine', function (err, res) {
        if (err) throw err;
        console.log('MedicineCollection created!');
        db.close();
      });
    });
  }

  static async create(medicine) {
    const client = await _mongodb.MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
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
            .collection('medicine')
            .insertOne(medicine, function (err, res) {
              err ? reject(err) : resolve(res);
            });
        });
      };

      const result = await myPromise();

      client.close();

      return result.ops[0];
    } catch (err) {
      return err;
    }
  }

  static async find(query = {}) {
    const client = await _mongodb.MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
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
            .collection('medicine')
            .find(query, {
              projection: { _id: 1, name: 1, dosage: 1 },
            })
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
}

exports. default = MedicineModel;
