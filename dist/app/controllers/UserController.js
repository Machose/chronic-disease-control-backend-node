"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup); //como o yup n possui um export defaut em nenhum lugar, a sintax import * as Yup possibilita que o app armazena tudo que esta dentro do arquivo yup dentro da variavel Yup

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  //Find a list user
  async index(req, res) {
    const users = await _User2.default.find();

    return res.status(200).json(users);
  }

  //Find one user
  async show(req, res) {
    const users = await _User2.default.find({ email: 'tes@email.com' });

    return res.status(200).json(users);
  }

  //Create user
  async store(req, res) {
    //lidando um objeto, que tenha formato ...
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6) //minimo de 6 digitos
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExist = await _User2.default.find({
      email: req.body.email
    });

    if (userExist.length) {
      return res.status(400).json({ error: 'User already exists. ' });
    }

    const { id, name, email } = await _User2.default.create(req.body);

    return res.status(201).json({ id, name, email });
  }

  async update(req, res) {
    //lidando um objeto, que tenha formato ...
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      oldpPassword: Yup.string().min(6), //minimo de 6 digitos
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      //nesse caso se a oldPassword for informada então a senha passa a ser obrigatória
      //o field referece as propriedade de cada campo, como por exemplo o Yup.required()
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )

      //field.required().onOf([Yup.ref('password')])
      //a propriedade oneOf recebe um array de possiveis valores que esse campo poderá ter, utilizando o Yup.ref podemos referenciar outro campo, nesse caso nós forçamos o campo confirmPassword a ter o valor igual ao password
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email, oldPassword, password } = req.body;

    const user = await _User2.default.findById(req.userId);

    if (email != user.email) {
      const userExist = await _User2.default.find({
        email: email
      });

      if (userExist.length) {
        return res.status(400).json({ error: 'User already exists. ' });
      }
    }

    //só troca a senha se uma nova for passada
    //verifica se a senha atual é igual a anterior para evitar fraudes
    if (
      oldPassword &&
      !(await _User2.default.checkPassword(oldPassword, user.password_hash))
    ) {
      return res.status(401).json({ error: 'Password does not mecth' });
    }

    await _User2.default.updateById(req.userId, { name, email, password });

    return res.json({ id: req.userId, name, email });
  }
}

exports. default = new UserController();
