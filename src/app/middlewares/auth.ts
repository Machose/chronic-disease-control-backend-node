import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { Request, Response } from 'express';

import authConfig from '../../config/auth';

interface RequestPlus extends Request {
  userId?: string;
}

export default async (
  req: RequestPlus,
  res: Response,
  next: Function
): Promise<Response> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  //retirando o 'Bearer ' que vem por padrão
  const [, token] = authHeader.split(' ');

  //promisify retorna uma função

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); //se essa função nãoconseguir descifrar o token ela cai direto no catch pois está sendo utilizado o await

    //se ela conseguir descifrar o token então a variavel decoded vai conter o payload do token. No nosso caso nos passamos apenas o ID como payload
    req.userId = decoded.id; //vamos utilizar esse ID para realizar a alteração do usuário

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
