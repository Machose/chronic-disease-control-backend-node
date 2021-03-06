"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup); //como o yup n possui um export defaut em nenhum lugar, a sintax import * as Yup possibilita que o app armazena tudo que esta dentro do arquivo yup dentro da variavel Yup

var _Food = require('../models/Food'); var _Food2 = _interopRequireDefault(_Food);





class FoodController {
  //Create user
  async store(req, res) {
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

    const food = await _Food2.default.create({
      name,
      grams,
      observation,
      user_id: req.userId
    });

    return res.status(201).json(food);
  }

  async update(req, res) {
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

    const food = await _Food2.default.updateById(id, {
      name,
      grams,
      observation
    });

    return res.status(200).json(food);
  }

  async index(req, res) {
    const foods = await _Food2.default.find({ user_id: req.userId });

    return res.status(200).json(foods);
  }

  async show(req, res) {
    const { id } = req.params;

    const food = await _Food2.default.findById(id);

    return res.status(200).json(food);
  }

  async delete(req, res) {
    const { id } = req.params;

    await _Food2.default.deleteById(id);

    return res.status(200).json({ deleted: true });
  }
}

exports. default = new FoodController();
