import { Request, Response } from 'express';

import DayWeek from '../models/DayWeek';

class DayWeekController {
  async index(req: Request, res: Response): Promise<Response> {
    const daysWeek = await DayWeek.find();

    return res.status(200).json(daysWeek);
  }
}

export default new DayWeekController();
