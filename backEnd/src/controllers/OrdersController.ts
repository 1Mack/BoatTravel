import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient'
import * as Yup from 'yup'


export default {

  async index(request: Request, response: Response) {
    const orders = await prismaClient.orders.findMany()

    return response.json(orders);
  },
  async show(request: Request, response: Response) {
    const id = request.params.id

    const orders = await prismaClient.orders.findMany(
      {
        orderBy: { date_appointment: 'desc' },
        where: { user_id: id },
        include: {
          boat: { include: { user: { select: { full_name: true } } } },
          user: {
            select: {
              id: true,
              full_name: true,
              age: true,
              telefone: true,
              email: true,
              cpf: true,
              created_at: true,
              updated_at: true,
            }
          }
        }
      }
    )
    if (!orders) return response.json({ message: 'No orders found' }).status(404)

    orders.map(order => order.boat.image_path = `http://${process.env.IP}:${process.env.PORT}/images/${order.boat.image_path}`)
    response.json({ orders }).status(200)
  },
  async create(request: Request, response: Response) {
    const { price, date_appointment, total_people, status, user_id, boat_id } = request.body

    const findUser = await prismaClient.users.findUnique({ where: { id: user_id } })
    const findBoat = await prismaClient.boats.findUnique({ where: { id: boat_id } })

    if (!findUser || !findBoat) return response.json({ message: `${!findUser ? 'User' : 'Boat'} not found` }).status(404)
    const data = {
      price,
      date_appointment: new Date(date_appointment),
      total_people,
      status,
      user_id,
      boat_id,
    }
    const schema = Yup.object().shape({
      price: Yup.number().required().positive().strict(),
      date_appointment: Yup.date().required().strict(),
      total_people: Yup.number().required().positive().strict(),
      status: Yup.string().required().matches(/(processing|completed|canceled)/),
    });
    await schema.validate(data,
      { abortEarly: false }
    )

    const orders = await prismaClient.orders.create({
      data
    })

    return response.json({ data: orders, message: 'Order created succefully' }).status(200);
  },
  async delete(request: Request, response: Response) {
    const id = request.params.id

    const orders = await prismaClient.orders.findUnique({ where: { id } })

    if (!orders) return response.json({ message: 'Order not found' }).status(404)

    await prismaClient.orders.delete({ where: { id } })
    return response.json({ message: 'Order deleted successfully' }).status(200);
  },
  async update(request: Request, response: Response) {
    const id = request.params.id
    const { price, status } = request.body

    const orders = await prismaClient.orders.findUnique({ where: { id } })

    if (!orders) return response.json({ message: 'Order not found' }).status(404)

    const data = {
      price, status
    }
    const parsedData = JSON.parse(JSON.stringify(data))

    if (Object.keys(parsedData).length === 0) return response.json({ message: 'You should provide at least one argument' }).status(404)


    const schema = Yup.object().shape({
      status: Yup.string().matches(/(processing|completed|canceled)/),
      price: Yup.number().positive().strict(),
    });
    await schema.validate(parsedData,
      { abortEarly: false }
    )

    await prismaClient.orders.update({ where: { id }, data: parsedData })

    return response.json({ message: 'Order edited successfully' }).status(200);
  }
};
