import { Server } from "http";
import express, { Application, json } from "express";
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
    this.initializeMiddleware();
    this.initializeControllers();
  }

  public listen(port: string) {
    this.server.listen(port, () => {
      console.log(`Listening on ${config.server.host}:${port}`);
    });
  }

  public initializeControllers() {
    const userController = new UserController(this.database);

    this.app.use('/users', userController.getRoutes());
  }

  public initializeMiddleware() {
    this.app.use(json());
  }
}

export default ServerApplication;