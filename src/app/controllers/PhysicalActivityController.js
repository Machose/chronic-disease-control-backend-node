import * as Yup from 'yup'; //como o yup n possui um export defaut em nenhum lugar, a sintax import * as Yup possibilita que o app armazena tudo que esta dentro do arquivo yup dentro da variavel Yup

import PhysicalActivityModel from '../models/PhysicalActivity';

class PhysicalActivityController {
  //Create user
  async store(req, res) {
    //lidando um objeto, que tenha formato ...
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      duration: Yup.string().required(),
      observation: Yup.string()
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, duration, observation } = req.body;

    const food = await PhysicalActivityModel.create({
      name,
      duration,
      observation,
      user_id: req.userId
    });

    return res.status(201).json(food);
  }

  async update(req, res) {
    //lidando um objeto, que tenha formato ...
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      duration: Yup.string().required(),
      observation: Yup.string()
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const { name, duration, observation } = req.body;

    const food = await PhysicalActivityModel.updateById(id, {
      name,
      duration,
      observation
    });

    return res.status(200).json(food);
  }

  async index(req, res) {
    const physicalActivities = await PhysicalActivityModel.find({
      user_id: req.userId
    });

    return res.status(200).json(physicalActivities);
  }

  async show(req, res) {
    const { id } = req.params;

    const physicalActivity = await PhysicalActivityModel.findById(id);

    return res.status(200).json(physicalActivity);
  }

  async delete(req, res) {
    const { id } = req.params;

    await PhysicalActivityModel.deleteById(id);

    return res.status(200).json({ deleted: true });
  }
}

export default new PhysicalActivityController();
