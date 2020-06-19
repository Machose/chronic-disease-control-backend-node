import { MongoClient } from 'mongodb';

import AbstractModel from '../../core/AbstractModel';

export default class DayWeekModel extends AbstractModel {
  protected static collectionName: string = 'day_week';

  public static async init() {
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

    const content = await this.find();

    if (!content.length) {
      this.createList(DEFAULT_VALUES);
    }
  }
}

const DEFAULT_VALUES = [
  {
    name: 'Domingo',
    order: 0
  },
  {
    name: 'Segunda-Feira',
    order: 1
  },
  {
    name: 'Terça-Feira',
    order: 2
  },
  {
    name: 'Quarta-Feira',
    order: 3
  },
  {
    name: 'Quinta-Feira',
    order: 4
  },
  {
    name: 'Sexta-Feira',
    order: 5
  },
  {
    name: 'Sábado',
    order: 6
  }
];
