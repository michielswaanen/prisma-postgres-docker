import { Server } from "http";
import express, { Application } from "express";
import config from "./config/config";
import { PrismaClient } from '@prisma/client'
import UserController from "./api/user.controller";

class ServerApplication {

  private readonly app: Application;
  private readonly server: Server;
  private readonly database: PrismaClient;

  public constructor() {
    this.app = express();
    this.server = new Server(this.app);
    this.database = new PrismaClient();
  }

  public listen(port: string) {
    this.server.listen(port, () => {
      console.log(`Listening on ${config.server.host}:${port}`);
    });

    const userController = new UserController(this.database);

    this.app.use('/users', userController.getRoutes());

  }
}

export default ServerApplication;