import { MongoClient } from 'mongodb';
import AbstractModel from '../../core/AbstractModel';

interface PhysicalActivityRoutine {
  physical_activity_id: string;
  day_week_id: string;
  schedule: string;
  user_id: string;
  day_week: any[];
  physical_activitys: any[];
}

export default class PhysicalActivityRoutineModel extends AbstractModel {
  protected static collectionName: string = 'physical_activity_routine';

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

      const myPromise = (): Promise<PhysicalActivityRoutine[]> => {
        return new Promise((resolve, reject) => {
          dataBase
            .collection(collectionName)
            .aggregate([
              { $match: query },
              {
                $project: {
                  physical_activity_id: {
                    $toObjectId: '$physical_activity_id'
                  },
                  days_week: 1,
                  schedule: 1
                }
              },
              {
                $lookup: {
                  from: 'physical_activity',
                  localField: 'physical_activity_id',
                  foreignField: '_id',
                  as: 'physical_activity'
                }
              }
            ])
            .sort({ schedule: 1 })
            .toArray(function (err, res) {
              err ? reject(err) : resolve(res);
            });
        });
      };

      const result: PhysicalActivityRoutine[] = await myPromise();

      client.close();

      return result;
    } catch (err) {
      return err;
    }
  }
}
