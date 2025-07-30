FROM node:24-alpine3.21 AS base


FROM base AS setup

WORKDIR /app

COPY package*.json ./

RUN npm install


FROM base AS build

WORKDIR /app

COPY --from=setup /app/node_modules ./node_modules

COPY . .

RUN npx prisma generate

RUN npm run build


FROM base AS service

WORKDIR /app

COPY --from=setup /app/node_modules ./node_modules

COPY --from=setup /app/package*.json ./

COPY --from=build /app/.env .env

COPY --from=build /app/dist ./dist

COPY --from=build /app/generated ./generated

COPY --from=build /app/prisma ./prisma

EXPOSE 4000

CMD ["node", "dist/server.js"]

