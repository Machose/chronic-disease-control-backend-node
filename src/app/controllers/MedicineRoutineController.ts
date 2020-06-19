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
      days_week: Yup.array().required(),
      schedule: Yup.string().required()
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { medicine_id, schedule, days_week } = req.body;

    const medicineRoutine = await MedicineRoutine.create({
      medicine_id,
      schedule,
      days_week,
      user_id: req.userId
    });

    return res.status(201).json(medicineRoutine);
  }

  async index(req: RequestPlus, res: Response): Promise<Response> {
    const { day_week_id } = req.query;

    let medicineRoutines;

    if (day_week_id) {
      const response = await MedicineRoutine.find({
        user_id: req.userId
      });

      medicineRoutines = response.filter((data) =>
        data.days_week.includes(day_week_id)
      );
    } else {
      medicineRoutines = await MedicineRoutine.find({
        user_id: req.userId
      });
    }

    return res.status(200).json(medicineRoutines);
  }

  async delete(req: RequestPlus, res: Response): Promise<Response> {
    const { id } = req.params;

    await MedicineRoutine.deleteById(id);

    return res.status(200).json({ deleted: true });
  }
}

export default new MedicineRoutineController();
