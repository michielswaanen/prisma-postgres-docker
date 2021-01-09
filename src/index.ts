import ServerApplication from "./app";
import config from "./config/config";
import { PrismaClient } from '@prisma/client';

console.log('Starting...')

/**
 * Initialization
 */
const port: string = config.server.port;
const database: PrismaClient = new PrismaClient();

/**
 * Start Application
 */
new ServerApplication(database).listen(port);