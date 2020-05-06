import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

class UserModel {
  constructor(name, email) {
    this.init();

    this.name = name;
    this.email = email;
  }

  static init() {
    MongoClient.connect(process.env.MONGO_URL, function (err, db) {
      if (err) throw err;
      var dbo = db.db(process.env.DATABASE);
      dbo.createCollection('users', function (err, res) {
        if (err) throw err;
        console.log('Collection created!');
        db.close();
      });
    });
  }

  static async create(user) {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
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
    const client = await MongoClient.connect(process.env.MONGO_URL, {
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
            .collection('users')
            .find(query, {
              projection: { _id: 0, name: 1, email: 1, password_hash: 1 },
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

  static async createPasswordHash(user) {
    const { name, email, password } = user;

    if (password) {
      const password_hash = await bcrypt.hash(user.password, 8); //retornar uma senha criptografada a partir do user.password com uma força de 8
      return { name, email, password_hash };
    }

    return user;
  }

  //Verifica se a senha passada sem criptografia é a mesma que foi criptografada no banco
  static async checkPassword(password, password_hash) {
    return await bcrypt.compare(password, password_hash);
  }
}

export default UserModel;
