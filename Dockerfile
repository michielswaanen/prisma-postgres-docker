FROM node:13-alpine

WORKDIR '/app'

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

ENV TEST="test"
ENV DATABASE_URL="postgresql://postgres:12345@database:5432/database?schema=public"

RUN yarn install

COPY . .

RUN yarn run prisma generate

CMD ["yarn", "start"]