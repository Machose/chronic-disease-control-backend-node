"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup); //como o yup n possui um export defaut em nenhum lugar, a sintax import * as Yup possibilita que o app armazena tudo que esta dentro do arquivo yup dentro da variavel Yup

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  //Create user
  async store(req, res) {
    //lidando um objeto, que tenha formato ...
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6), //minimo de 6 digitos
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExist = await _User2.default.find({
      email: req.body.email,
    });

    if (userExist.length) {
      return res.status(400).json({ error: 'User already exists. ' });
    }

    const { id, name, email, provider } = await _User2.default.create(req.body);

    return res.status(201).json({ id, name, email, provider });
  }

  async update(req, res) {
    return res.status(200).json({ message: 'Hello update a user' });
  }

  async index(req, res) {
    const users = await _User2.default.find();

    return res.status(200).json(users);
  }

  //Find one user
  async show(req, res) {
    const users = await _User2.default.find({ email: 'tes@email.com' });

    return res.status(200).json(users);
  }
}

exports. default = new UserController();
