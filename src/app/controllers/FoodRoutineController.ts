import { Request, Response } from 'express';
import * as Yup from 'yup'; //como o yup n possui um export defaut em nenhum lugar, a sintax import * as Yup possibilita que o app armazena tudo que esta dentro do arquivo yup dentro da variavel Yup

import FoodRoutineModel from '../models/FoodRoutine';

interface RequestPlus extends Request {
  userId?: string;
}

class FoodRoutineController {
  //Create user
  async store(req: RequestPlus, res: Response): Promise<Response> {
    //lidando um objeto, que tenha formato ...

    const schema = Yup.object().shape({
      food_id: Yup.string().required(),
      days_week: Yup.array().required(),
      schedule: Yup.string().required()
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { food_id, days_week, schedule } = req.body;

    const foodRoutine = await FoodRoutineModel.create({
      food_id,
      days_week,
      schedule,
      user_id: req.userId
    });

    return res.status(201).json(foodRoutine);
  }

  async index(req: RequestPlus, res: Response): Promise<Response> {
    const { day_week_id } = req.query;

    let foodRoutines;

    if (day_week_id) {
      const response = await FoodRoutineModel.find({
        user_id: req.userId
      });

      foodRoutines = response.filter((data) =>
        data.days_week.includes(day_week_id)
      );
    } else {
      foodRoutines = await FoodRoutineModel.find({
        user_id: req.userId
      });
    }

    return res.status(200).json(foodRoutines);
  }
}

export default new FoodRoutineController();
