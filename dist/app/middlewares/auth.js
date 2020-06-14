"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');


var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);





exports. default = async (
  req,
  res,
  next
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  //retirando o 'Bearer ' que vem por padrão
  const [, token] = authHeader.split(' ');

  //promisify retorna uma função

  try {
    const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, _auth2.default.secret); //se essa função nãoconseguir descifrar o token ela cai direto no catch pois está sendo utilizado o await

    //se ela conseguir descifrar o token então a variavel decoded vai conter o payload do token. No nosso caso nos passamos apenas o ID como payload
    req.userId = decoded.id; //vamos utilizar esse ID para realizar a alteração do usuário

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
