import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient'
import { hash } from 'bcryptjs'
import * as Yup from 'yup'

export default {

  async index(request: Request, response: Response) {
    const users = await prismaClient.users.findMany()

    return response.json(users);
  },
  async show(request: Request, response: Response) {
    const id = request.params.id

    const users = await prismaClient.users.findUnique({ where: { id } })

    return users ? response.json({ data: users }).status(200) : response.json({ message: 'No users found' }).status(404)
  },
  async create(request: Request, response: Response) {
    const { full_name, age, telefone, email, cpf, password } = request.body
    let data = {
      full_name,
      age: Number(age),
      telefone,
      email,
      cpf,
      password,
      image_path: undefined as undefined | string
    }
    const requestImages = request.file as Express.Multer.File;

    if (requestImages) {
      data.image_path = requestImages.filename
    }

    const schema = Yup.object().shape({
      full_name: Yup.string().required(),
      age: Yup.number().required().strict(),
      telefone: Yup.string().required().strict(),
      email: Yup.string().required().email(),
      cpf: Yup.string().required().strict(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false
    })

    const checkUserExist = await prismaClient.users.findFirst({
      where: {
        OR: [
          {
            cpf: cpf
          },
          {
            email: email
          },
          {
            telefone: telefone
          }
        ]
      }
    })

    if (checkUserExist) return response.json({ message: 'User already exists' }).status(404)


    const hashedPassword = await hash(password, 8);

    data.password = hashedPassword

    const user = await prismaClient.users.create({
      data
    })

    // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
    delete user.password

    return response.json({ data: user, message: 'User created succefully' }).status(200);
  },
  async delete(request: Request, response: Response) {
    const id = request.params.id

    const users = await prismaClient.users.findUnique({ where: { id } })

    if (!users) return response.json({ message: 'User not found' }).status(404)

    await prismaClient.users.delete({ where: { id } })
    return response.json({ message: 'User deleted successfully' }).status(200);
  },
  async update(request: Request, response: Response) {
    const id = request.params.id
    const { full_name, age, telefone, email } = request.body

    const users = await prismaClient.users.findUnique({ where: { id } })

    if (!users) return response.json({ message: 'User not found' }).status(404)

    const data = {
      full_name, age, telefone, email
    }
    const parsedData = JSON.parse(JSON.stringify(data))

    if (Object.keys(parsedData).length === 0) return response.json({ message: 'You should provide at least one argument' }).status(404)


    const schema = Yup.object().shape({
      full_name: Yup.string(),
      age: Yup.number().integer().positive().strict(),
      telefone: Yup.string(),
      email: Yup.string().email(),
    });
    await schema.validate(parsedData,
      { abortEarly: false }
    )

    await prismaClient.users.update({ where: { id }, data: parsedData })

    return response.json({ message: 'User edited successfully' }).status(200);
  },
  async showOrders(request: Request, response: Response) {
    const id = request.params.id

    const usersOrders = await prismaClient.orders.findMany({ where: { user_id: id } })

    return usersOrders ? response.json({ data: usersOrders }).status(200) : response.json({ message: 'No orders found' }).status(404)
  },
};
