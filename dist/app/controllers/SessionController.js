"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Esse arquivo servira para criar uma senssão de autenticação
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await _User2.default.find({
      email,
    });

    //verifica se existe um usuário com esse email
    if (!user.length) {
      return res.status(401).json({ error: 'User not found' });
    }

    //Verifica se a senha informada é a mesma do usuário
    if (!(await _User2.default.checkPassword(password, user[0].password_hash))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { _id: id, name } = user[0];

    return res.json({
      user: {
        id,
        name,
        email,
      },

      token: _jsonwebtoken2.default.sign({ id }, _auth2.default.secret, {
        expiresIn: _auth2.default.expiresIn,
      }),
    });
  }
}

exports. default = new SessionController();

//jwt.sing( ) cria um token
/* parametros:
      1ª: {payload}
      2ª: string com texto unico - pode utilizar o https://www.md5online.org/ pra gerar esse texto. EX: gobarberrocketseatnode2 -> f29618255c309de4469993cce24286ea
      3ª: {Configurações}
      */
