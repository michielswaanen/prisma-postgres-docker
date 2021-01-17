import ServerApplication from "../../../src/app";
import { PrismaClient } from "@prisma/client";
import { Application } from "express";
import supertest from 'supertest';

describe(`POST - /user`, () => {

  const database: PrismaClient = new PrismaClient();
  const application: Application = new ServerApplication(database).getApplication();
  const server = supertest(application);

  it(`Create a user`, async () => {
    await server
      .post('/users')
      .send({
        email: 'test@test.com'
      })
      .expect(201);
  });

});