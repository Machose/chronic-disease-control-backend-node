import bcrypt from 'bcryptjs';
import { MongoClient, ObjectID } from 'mongodb';
import AbstractModel from '../../core/AbstractModel';

interface Result {
  ops?: any[];
}

class UserModel extends AbstractModel {
  protected static collectionName: string = 'user';

  static async create(user) {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
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

      const result: Result = await myPromise();

      client.close();

      return result.ops[0];
    } catch (err) {
      return err;
    }
  }

  static async updateById(id, user) {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
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
            .updateOne({ _id: new ObjectID(id) }, { $set: user }, function (
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
      const password_hash = await bcrypt.hash(user.password, 8); //retornar uma senha criptografada a partir do user.password com uma força de 8
      return { name, email, password_hash };
    }

    return { name, email };
  }

  //Verifica se a senha passada sem criptografia é a mesma que foi criptografada no banco
  static async checkPassword(password, password_hash) {
    return await bcrypt.compare(password, password_hash);
  }
}

export default UserModel;
