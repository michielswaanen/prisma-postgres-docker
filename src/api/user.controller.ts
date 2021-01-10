import express, { Request, Response, Router } from "express";
import { PrismaClient } from '@prisma/client';

class UserController {

  private readonly database: PrismaClient;

  public constructor(database: PrismaClient) {
    this.database = database;
  }

  public getRoutes() {
    const router: Router = express.Router();

    router.get('/', this.read.bind(this));
    router.post('/', this.create.bind(this));
    router.patch('/:id', this.update.bind(this));
    router.delete('/:id', this.delete.bind(this));

    return router;
  }

  public async read(req: Request, res: Response) {
    const users = await this.database.user.findMany({
      select: {
        id: true,
        email: true,
        posts: {
          include: {
            author: true
          }
        }
      }
    });

    res.status(200).send(users);
  }

  public async create(req: Request, res: Response) {
    const { email, name } = req.body;

    const user = await this.database.user.create({
      data: {
        email: email,
        name: name,
        posts: {
          create: {
            content: 'Content',
            title: 'Title'
          }
        }
      },
      select: {
        name: true,
        email: true,
        posts: {
          select: {
            content: true,
            title: true,
            published: true
          }
        }
      }
    });

    res.status(201).send(user);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await this.database.user.update({
      data: {
        email: email,
        name: name
      },
      where: {
        id: Number(id)
      },
    });

    res.status(200).send(user);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const userFound = await this.database.user.count({ where: { id: Number(id) } });

    if (!userFound)
      throw Error(`User doesn't exists!`);

    const profiles = await this.database.profile.count({ where: { user: { id: Number(id) } } });

    if (profiles > 0)
      await this.database.profile.delete({ where: { userId: Number(id) } });

    const posts = await this.database.post.findMany({
      where: {
        author: { id: Number(id) }
      }, select: {
        id: true
      }
    });

    if (posts) {
      for (let post of posts) {
        await this.database.post.delete({ where: { id: post.id } });
      }
    }

    const user = await this.database.user.delete({ where: { id: Number(id) } });

    res.status(200).send(user);
  }
}

export default UserController;