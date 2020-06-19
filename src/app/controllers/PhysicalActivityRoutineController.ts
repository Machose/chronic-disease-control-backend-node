import { Request, Response } from 'express';
import * as Yup from 'yup'; //como o yup n possui um export defaut em nenhum lugar, a sintax import * as Yup possibilita que o app armazena tudo que esta dentro do arquivo yup dentro da variavel Yup

import PhysicalActivityRoutineModel from '../models/PhysicalActivityRoutine';

interface RequestPlus extends Request {
  userId?: string;
}

class PhysicalActivityRoutineController {
  //Create user
  async store(req: RequestPlus, res: Response): Promise<Response> {
    //lidando um objeto, que tenha formato ...
    const schema = Yup.object().shape({
      physical_activity_id: Yup.string().required(),
      days_week: Yup.array().required(),
      schedule: Yup.string().required()
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { physical_activity_id, days_week, schedule } = req.body;

    const physicalActivityRoutine = await PhysicalActivityRoutineModel.create({
      physical_activity_id,
      days_week,
      schedule,
      user_id: req.userId
    });

    return res.status(201).json(physicalActivityRoutine);
  }

  async index(req: RequestPlus, res: Response): Promise<Response> {
    const { day_week_id } = req.query;

    let physicalActivityRoutines;

    if (day_week_id) {
      const response = await PhysicalActivityRoutineModel.find({
        user_id: req.userId
      });

      physicalActivityRoutines = response.filter((data) =>
        data.days_week.includes(day_week_id)
      );
    } else {
      physicalActivityRoutines = await PhysicalActivityRoutineModel.find({
        user_id: req.userId
      });
    }

    return res.status(200).json(physicalActivityRoutines);
  }
}

export default new PhysicalActivityRoutineController();
