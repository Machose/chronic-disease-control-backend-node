import { Request, Response } from 'express';
import * as Yup from 'yup'; //como o yup n possui um export defaut em nenhum lugar, a sintax import * as Yup possibilita que o app armazena tudo que esta dentro do arquivo yup dentro da variavel Yup

import MedicineRoutine from '../models/MedicineRoutine';

interface RequestPlus extends Request {
  userId?: string;
}

class MedicineRoutineController {
  //Create user
  async store(req: RequestPlus, res: Response): Promise<Response> {
    //lidando um objeto, que tenha formato ...
    const schema = Yup.object().shape({
      medicine_id: Yup.string().required(),
      day_week_id: Yup.string().required(),
      schedule: Yup.string().required()
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { medicine_id, day_week_id, schedule } = req.body;

    const medicineRoutine = await MedicineRoutine.create({
      medicine_id,
      day_week_id,
      schedule,
      user_id: req.userId
    });

    return res.status(201).json(medicineRoutine);
  }

  async index(req: RequestPlus, res: Response): Promise<Response> {
    const { day_week_id } = req.query;

    const medicineRoutines = await MedicineRoutine.find({
      day_week_id,
      user_id: req.userId
    });

    return res.status(200).json(medicineRoutines);
  }
}

export default new MedicineRoutineController();
