"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongodb = require('mongodb');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class UserModel {
  constructor(name, email) {
    this.init();

    this.name = name;
    this.email = email;
  }

  static init() {
    _mongodb.MongoClient.connect(process.env.MONGO_URL, function (err, db) {
      if (err) throw err;
      var dbo = db.db(process.env.DATABASE);
      dbo.createCollection('users', function (err, res) {
        if (err) throw err;
        console.log('UserCollection created!');
        db.close();
      });
    });
  }

  static async create(user) {
    const client = await _mongodb.MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    user = await this.createPasswordHash(user);

    try {
      const dataBase = client.db(process.env.DATABASE);

      const myPromise = () => {
        return new Promise((resolve, reject) => {
          dataBase.collection('users').insertOne(user, function (err, res) {
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
            .collection('users')
            .find(query, {
              projection: { _id: 1, name: 1, email: 1, password_hash: 1 }
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

  static async findById(id) {
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
            .collection('users')
            .findOne({ _id: new (0, _mongodb.ObjectID)(id) }, function (err, res) {
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

  static async updateById(id, user) {
    const client = await _mongodb.MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    }).catch((err) => {
      console.log(err);
    });

    if (!client) {
      return;
    }

    user = await this.createPasswordHash(user);

    try {
      const dataBase = client.db(process.env.DATABASE);

      const myPromise = () => {
        return new Promise((resolve, reject) => {
          dataBase
            .collection('users')
            .updateOne({ _id: new (0, _mongodb.ObjectID)(id) }, { $set: user }, function (
              err,
              res
            ) {
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

  static async createPasswordHash(user) {
    const { name, email, password } = user;

    if (password) {
      const password_hash = await _bcryptjs2.default.hash(user.password, 8); //retornar uma senha criptografada a partir do user.password com uma força de 8
      return { name, email, password_hash };
    }

    return { name, email };
  }

  //Verifica se a senha passada sem criptografia é a mesma que foi criptografada no banco
  static async checkPassword(password, password_hash) {
    return await _bcryptjs2.default.compare(password, password_hash);
  }
}

exports. default = UserModel;
