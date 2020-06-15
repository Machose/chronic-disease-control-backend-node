import { MongoClient } from 'mongodb';
import AbstractModel from '../../core/AbstractModel';

interface MedicineRoutine {
  medicine_id: string;
  day_week_id: string;
  schedule: string;
  user_id: string;
  day_week: any[];
  medicines: any[];
}

export default class MedicineRoutineModel extends AbstractModel {
  protected static collectionName: string = 'medicine_routine';

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

      const myPromise = (): Promise<MedicineRoutine[]> => {
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

      const result: MedicineRoutine[] = await myPromise();

      client.close();

      return result;
    } catch (err) {
      return err;
    }
  }
}
