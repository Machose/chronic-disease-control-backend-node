import { Request, Response } from 'express';
import * as Yup from 'yup'; //como o yup n possui um export defaut em nenhum lugar, a sintax import * as Yup possibilita que o app armazena tudo que esta dentro do arquivo yup dentro da variavel Yup

import FoodModel from '../models/Food';

interface RequestPlus extends Request {
  userId?: string;
}

class FoodController {
  //Create user
  async store(req: RequestPlus, res: Response): Promise<Response> {
    //lidando um objeto, que tenha formato ...
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      grams: Yup.string().required(),
      observation: Yup.string()
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, grams, observation } = req.body;

    const food = await FoodModel.create({
      name,
      grams,
      observation,
      user_id: req.userId
    });

    return res.status(201).json(food);
  }

  async update(req: RequestPlus, res: Response): Promise<Response> {
    //lidando um objeto, que tenha formato ...
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      grams: Yup.string().required(),
      observation: Yup.string()
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const { name, grams, observation } = req.body;

    const food = await FoodModel.updateById(id, {
      name,
      grams,
      observation
    });

    return res.status(200).json(food);
  }

  async index(req: RequestPlus, res: Response): Promise<Response> {
    const foods = await FoodModel.find({ user_id: req.userId });

    return res.status(200).json(foods);
  }

  async show(req: RequestPlus, res: Response): Promise<Response> {
    const { id } = req.params;

    const food = await FoodModel.findById(id);

    return res.status(200).json(food);
  }

  async delete(req: RequestPlus, res: Response): Promise<Response> {
    const { id } = req.params;

    await FoodModel.deleteById(id);

    return res.status(200).json({ deleted: true });
  }
}

export default new FoodController();
