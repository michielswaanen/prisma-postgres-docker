import type {Config} from '@jest/types'

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: false,
  setupFilesAfterEnv: [
    './tests/core/setup.jest.ts'
  ]
}

export default config;