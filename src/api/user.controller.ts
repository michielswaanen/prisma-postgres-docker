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
}

export default UserController;