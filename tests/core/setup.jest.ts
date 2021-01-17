import execa from 'execa'
import { PrismaClient } from "@prisma/client";

/**
 * @author Michiel Swaanen
 *
 * Jest environment setup
 */

beforeAll(async () => {
  await execa('yarn', ['migrate']);
});

afterEach(async () => {
  jest.clearAllMocks();
});