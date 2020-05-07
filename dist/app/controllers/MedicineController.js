"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup); //como o yup n possui um export defaut em nenhum lugar, a sintax import * as Yup possibilita que o app armazena tudo que esta dentro do arquivo yup dentro da variavel Yup

var _Medicine = require('../models/Medicine'); var _Medicine2 = _interopRequireDefault(_Medicine);

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

    const medicine = await _Medicine2.default.create({
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
    const medicines = await _Medicine2.default.find({ user_id: req.userId });

    return res.status(200).json(medicines);
  }
}

exports. default = new MedicineController();
