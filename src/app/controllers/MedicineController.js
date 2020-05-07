import * as Yup from 'yup'; //como o yup n possui um export defaut em nenhum lugar, a sintax import * as Yup possibilita que o app armazena tudo que esta dentro do arquivo yup dentro da variavel Yup

import MedicineModel from '../models/Medicine';

class MedicineController {
  //Create user
  async store(req, res) {
    //lidando um objeto, que tenha formato ...
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      dosage: Yup.string().required(),
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, dosage } = req.body;

    const medicine = await MedicineModel.create({
      name,
      dosage,
      user_id: req.userId,
    });

    return res.status(201).json(medicine);
  }

  async update(req, res) {
    return res.status(200).json({ message: 'Hello update a user' });
  }

  async index(req, res) {
    const medicines = await MedicineModel.find({ user_id: req.userId });

    return res.status(200).json(medicines);
  }
}

export default new MedicineController();
