import { MongoClient } from 'mongodb';
import AbstractModel from '../../core/AbstractModel';

interface FoodRoutine {
  food_id: string;
  day_week_id: string;
  schedule: string;
  user_id: string;
  day_week: any[];
  food: any[];
}

export default class FoodRoutineModel extends AbstractModel {
  protected static collectionName: string = 'food_routine';

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

      const myPromise = (): Promise<FoodRoutine[]> => {
        return new Promise((resolve, reject) => {
          dataBase
            .collection(collectionName)
            .aggregate([
              { $match: query },
              {
                $project: {
                  food_id: { $toObjectId: '$food_id' },
                  days_week: 1,
                  schedule: 1
                }
              },
              {
                $lookup: {
                  from: 'food',
                  localField: 'food_id',
                  foreignField: '_id',
                  as: 'food'
                }
              }
            ])
            .sort({ schedule: 1 })
            .toArray(function (err, res) {
              err ? reject(err) : resolve(res);
            });
        });
      };

      const result: FoodRoutine[] = await myPromise();

      client.close();

      return result;
    } catch (err) {
      return err;
    }
  }
}
