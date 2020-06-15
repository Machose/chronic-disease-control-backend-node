"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _mongodb = require('mongodb');
var _AbstractModel = require('../../core/AbstractModel'); var _AbstractModel2 = _interopRequireDefault(_AbstractModel);





class UserModel extends _AbstractModel2.default {
   static __initStatic() {this.collectionName = 'user'}

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
          dataBase.collection('user').insertOne(user, function (err, res) {
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
            .collection('user')
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
} UserModel.__initStatic();

exports. default = UserModel;
