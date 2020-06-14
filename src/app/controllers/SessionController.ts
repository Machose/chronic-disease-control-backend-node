//Esse arquivo servira para criar uma senssão de autenticação
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as Yup from 'yup';
import authConfig from '../../config/auth';

import User from '../models/User';

interface RequestPlus extends Request {
  userId?: string;
}

class SessionController {
  async store(req: RequestPlus, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.find({
      email
    });

    //verifica se existe um usuário com esse email
    if (!user.length) {
      return res.status(401).json({ error: 'User not found' });
    }

    //Verifica se a senha informada é a mesma do usuário
    if (!(await User.checkPassword(password, user[0].password_hash))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { _id: id, name } = user[0];

    return res.json({
      user: {
        id,
        name,
        email
      },

      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();

//jwt.sing( ) cria um token
/* parametros:
      1ª: {payload}
      2ª: string com texto unico - pode utilizar o https://www.md5online.org/ pra gerar esse texto. EX: gobarberrocketseatnode2 -> f29618255c309de4469993cce24286ea
      3ª: {Configurações}
      */
