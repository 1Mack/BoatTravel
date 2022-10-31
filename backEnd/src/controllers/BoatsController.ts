import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient'
import * as Yup from 'yup'


export default {

  async index(request: Request, response: Response) {
    const boats = await prismaClient.boats.findMany({
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            telefone: true
          }
        }
      }
    })

    boats.map(boat => boat.image_path = `http://${process.env.IP}:${process.env.PORT}/images/${boat.image_path}`)

    return response.json(boats);
  },
  async show(request: Request, response: Response) {
    const id = request.params.id

    const boat = await prismaClient.boats.findUnique({ where: { id } })

    if (!boat) return response.json({ message: 'No boat found' }).status(404)

    boat.image_path = `http://${process.env.IP}:${process.env.PORT}/images/${boat.image_path}`


    response.json({ data: boat }).status(200)
  },
  async create(request: Request, response: Response) {
    const { type, model, state, city, street, latitude, longitude, sailor, total_people, price, unique_id, description, owner_id } = request.body

    const findUser = await prismaClient.users.findUnique({ where: { id: owner_id } })

    if (!findUser) return response.json({ message: 'User not found to be the owner' }).status(404)

    const data = {
      type,
      model,
      state,
      city,
      street,
      latitude,
      longitude,
      sailor,
      total_people,
      price,
      unique_id,
      description,
      owner_id,
      image_path: undefined as undefined | string
    }

    const requestImages = request.file as Express.Multer.File;

    if (requestImages) {
      data.image_path = requestImages.filename
    }


    const schema = Yup.object().shape({
      type: Yup.string().required().matches(/(boat|jetski|schooner)/),
      model: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      street: Yup.string(),
      latitude: Yup.string(),
      longitude: Yup.string(),
      sailor: Yup.string(),
      total_people: Yup.number().integer().positive().strict(),
      price: Yup.number().positive().strict(),
      description: Yup.string(),
      unique_id: Yup.string().strict(),
    });

    await schema.validate(data, {
      abortEarly: false
    })
    const boats = await prismaClient.boats.create({
      data
    })

    return response.json({ data: boats, message: 'Boat created succefully' }).status(200);
  },
  async delete(request: Request, response: Response) {
    const id = request.params.id

    const boats = await prismaClient.boats.findUnique({ where: { id } })

    if (!boats) return response.json({ message: 'Boat not found' }).status(404)

    await prismaClient.boats.delete({ where: { id } })
    return response.json({ message: 'Boat deleted successfully' }).status(200);
  },
  async update(request: Request, response: Response) {
    const id = request.params.id
    const { type, model, state, city, street, latitude, longitude, sailor, total_people, price, description } = request.body

    const boats = await prismaClient.boats.findUnique({ where: { id } })

    if (!boats) return response.json({ message: 'User not found' }).status(404)

    const data = {
      type, model, state, city, street, latitude, longitude, sailor, total_people, price
    }
    const parsedData = JSON.parse(JSON.stringify(data))

    if (Object.keys(parsedData).length === 0) return response.json({ message: 'You should provide at least one argument' }).status(404)


    const schema = Yup.object().shape({
      type: Yup.string(),
      model: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      street: Yup.string(),
      latitude: Yup.string(),
      longitude: Yup.string(),
      sailor: Yup.string(),
      total_people: Yup.number().integer().positive().strict(),
      price: Yup.number().positive().strict(),
      description: Yup.string(),
    });
    await schema.validate(parsedData,
      { abortEarly: false }
    )

    await prismaClient.boats.update({ where: { id }, data: parsedData })

    return response.json({ message: 'Boat edited successfully' }).status(200);
  },
  async showOrders(request: Request, response: Response) {
    const id = request.params.id
    const boatsOrders = await prismaClient.orders.findMany({ where: { boat_id: id, date_appointment: { gte: new Date() }, status: { in: ['processing', 'completed'] } } })
    return boatsOrders ? response.json({ data: boatsOrders }).status(200) : response.json({ message: 'No orders found' }).status(404)
  },
};
