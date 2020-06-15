import { MongoClient, ObjectID } from 'mongodb';

interface Result {
  ops?: any[];
}

abstract class AbstractModel {
  protected static collectionName: string;

  public static init() {
    const collectionName = this.collectionName;

    MongoClient.connect(process.env.MONGO_URL, function (err, db) {
      if (err) throw err;
      var dbo = db.db(process.env.DATABASE);
      dbo.createCollection(collectionName, function (err, res) {
        if (err) throw err;
        console.log(`${collectionName}Collection created!`);
        db.close();
      });
    });
  }

  public static async create(object) {
    const collectionName = this.collectionName;

    const client = await MongoClient.connect(process.env.MONGO_URL, {
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
            .insertOne(object, function (err, res) {
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

  public static async createList(listObject) {
    const collectionName = this.collectionName;

    const client = await MongoClient.connect(process.env.MONGO_URL, {
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
            .insertMany(listObject, function (err, res) {
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

  public static async find(query = {}) {
    const collectionName = this.collectionName;

    const client = await MongoClient.connect(process.env.MONGO_URL, {
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
            .find(query)
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

  public static async findById(id) {
    const collectionName = this.collectionName;

    const client = await MongoClient.connect(process.env.MONGO_URL, {
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
            .findOne({ _id: new ObjectID(id) }, function (err, res) {
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

  public static async updateById(id, newValues = {}) {
    const collectionName = this.collectionName;

    const client = await MongoClient.connect(process.env.MONGO_URL, {
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
            .updateOne(
              { _id: new ObjectID(id) },
              { $set: newValues },
              function (err, res) {
                err ? reject(err) : resolve(res);
              }
            );
        });
      };

      const result = await myPromise();

      client.close();

      return result;
    } catch (err) {
      return err;
    }
  }

  public static async deleteById(id) {
    const collectionName = this.collectionName;

    const client = await MongoClient.connect(process.env.MONGO_URL, {
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
            .deleteOne({ _id: new ObjectID(id) }, function (err, res) {
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

export default AbstractModel;
