# NZ Public Holidays API

After investigating if the New Zealand Government had a public API for providing public holidays, and failing to find anything, I set out to create my own.

This API is available at [https://nz-public-holidays.nickleslie.workers.dev/](https://nz-public-holidays.nickleslie.workers.dev/).

Appending a year (`YYYY`) as a URL param will return that year's public holidays. E.g. [https://nz-public-holidays.nickleslie.workers.dev/2023](https://nz-public-holidays.nickleslie.workers.dev/2023)

## Technology used

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [PlanetScale](https://planetscale.com/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Hono](https://honojs.dev/)

## Quick start

After creating a database with PlanetScale and a data proxy with Prisma, add the connection string to `.dev.vars` and `.env` with the key `DATABASE_PROXY_URL`

`.env` is required for seeding the database.

```bash
pnpm db-generate
pnpm db-push
pnpm db-seed
pnpm dev
```

## Deploy

```bash
pnpm deploy
```

## Response

The expected payload is as follows.
All types specified are standard JavaScript types.

```JSON
{
    "year": // The year the holiday's occur in
        [
            {
                "date": string // The official date of the holiday
                "name": string // The official name of the holiday
                "observedDate": string // The actual date the holiday occurs
                "region": {
                    "name": string // The name of the region the holiday occurs.
                    "id": string // The id of the region.
                }
                "id": string // The id of the holiday.
            }

            ...
        ]
    ...
}
```

### Returned Holiday Model

```TypeScript
/**
 * A holiday model returned by the API.
 */
export default class HolidayDto extends BaseDbEntityDto {
  /**
   * The official date of the holiday.
   */
  public date: string;

  /**
   * The official name of the holiday in a human-readable format.
   */
  public name: string;

  /**
   * The actual date the holiday occurs.
   */
  public observedDate: string;

  /**
   * The region the holiday is associated with.
   * "All" region means it is a country-wide holiday.
   */
  public region: RegionDto;
}
```

### Returned Region Model

```TypeScript
/**
 * The region a holiday occurs.
 * This model is returned by the API.
 */
export default class RegionDto extends BaseDbEntityDto {
  /**
   * The name of the region the holiday occurs.
   * "All" region means it is a country-wide holiday.
   */
  public name: string;
}
```

### Returned Base Model

```TypeScript
/**
 * Base model returned by the API.
 */
export default abstract class BaseDbEntityDto {
  /**
   * The database id.
   */
  public id: string;
}
```

## FAQ

### Where is the holiday data from?

Data comes from two official locations.

- [New Zealand Government](https://www.govt.nz/browse/work/public-holidays-and-work/public-holidays-and-anniversary-dates/)
- [Employment New Zealand](https://www.employment.govt.nz/leave-and-holidays/public-holidays/public-holidays-and-anniversary-dates/)

Two sources were used as some holidays (Buller) were not included and other sources did not include a valid list of observed dates.

### The dates are wrong/incomplete

Feel free to update the database seed data found in [./prisma/holidays.json](./prisma/holidays.json) and put it up for pull request.

## License

MIT
