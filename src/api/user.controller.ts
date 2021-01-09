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
    router.post('/', this.add.bind(this));

    return router;
  }

  public async read(req: Request, res: Response) {
    const users = await this.database.user.findMany({
      select: {
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

  public async add(req: Request, res: Response) {
    const {email, name} = req.body;

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
}

export default UserController;