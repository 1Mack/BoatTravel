import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient'
import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import authConfig from '../config/auth';


export default {
  async index(request: Request, response: Response) {

    const token = request.headers.authorization;

    try {
      if (!token) throw new Error('Invalid token')

      const { sub } = verify(token.split(' ')[1], authConfig.jwt.secret);

      const user = await prismaClient.users.findUnique({ where: { id: String(sub) } })

      if (user) {
        return response.json({ message: 'Valid Token' })
      } else {
        throw new Error('Invalid token')
      }

    } catch {

      return response.json({ error: 'Invalid Token' })
    }
  },
  async create(request: Request, response: Response) {

    const { email, password } = request.body;

    const user = await prismaClient.users.findUnique({ where: { email } });

    if (!user) {
      return response.json({ message: 'Combinação de email/senha incorretos' }).status(401);
    }

    const verificaSenha = await compare(password, user.password);

    if (!verificaSenha) {
      return response.json({ message: 'Combinação de email/senha incorretos' }).status(401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      //expiresIn: authConfig.jwt.expiresIn,
    });

    // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando

    delete user.password;

    return response.json({ user, token });

  },
  async delete(request: Request, response: Response) {
    const id = request.params.id

    const orders = await prismaClient.orders.findUnique({ where: { id } })

    if (!orders) return response.json({ message: 'Order not found' }).status(404)

    await prismaClient.orders.delete({ where: { id } })
    return response.json({ message: 'Order deleted successfully' }).status(200);
  },
};
