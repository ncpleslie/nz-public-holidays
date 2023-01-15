# NZ Public Holidays API

After investigating if the New Zealand Government had a public API for providing public holidays, and failing to find anything, I set out to create my own.

## Features

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [PlanetScale](https://planetscale.com/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Hono](https://honojs.dev/)

## Quick start

After creating a database with PlanetScale and a data proxy with Prisma, add the connection string to `.dev.vars` and `.env` with the key `DATABASE_PROXY_URL`

`.env` is required for seeding the database.

```
pnpm db-generate
pnpm db-push
pnpm db-seed
pnpm dev
```

## Deploy

```
pnpm deploy
```

## License

MIT
