import { Request, Response } from "express";

import prisma from '../../database/prismaClient'

export class UserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      email,
      password,

    } = request.body;

    try {
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password,

        }
      })

      return response.json(user.id)
    } catch (error) {
      console.log('erro', error);
      response.status(500)
    }
  }

  async user(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    response.json(user)
  }

  async all(request: Request, response: Response) {
    try {
      const users = await prisma.user.findMany()
      return response.json(users)
    } catch (error) {
      console.log('erro', error);
      return response.send('Erro na listagem')
    }
  }

  async delete(request: Request, response: Response) {

    const { id } = request.params
    try {
      const deleteUser = await prisma.user.delete({
        where: {
          id: id
        }
      })
      return response.json(deleteUser.id)
    } catch (error) {
      console.log('erro', error);
      response.status(500)
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const {
      name,
      email,
      password,
    } = request.body

    try {
      const userUpdated = await prisma.user.update({
        where: {
          id: id
        },
        data: {
          name: name,
          email: email,
          password: password,

        }
      }).then(response => {
        return response
      }).catch(err => {
        return err
      })

      return response.json(userUpdated)
    } catch (error) {
      console.log(error);

      response.json(error)

    }
  }
}
