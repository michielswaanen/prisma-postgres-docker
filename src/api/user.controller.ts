import { PrismaClient } from '@prisma/client';
import express, { Application, Request, Response, Router } from "express";

const prisma = new PrismaClient();

class UserController {

  private readonly prisma: PrismaClient;

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public getRoutes() {
    const router: Router = express.Router();

    router.get('/', this.read);
    router.post('/', this.add);

    return router;
  }

  public async read(req: Request, res: Response) {
    const users = await prisma.user.findMany({
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

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        posts: {
          create: {
            content: 'Content',
            title: 'Title'
          }
        }
      }
    });

    res.status(201).send(user);
  }
}

export default UserController;