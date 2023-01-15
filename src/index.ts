import { Hono, Next } from "hono";
import { holidaySchema, holidayParams } from "./models/holiday_params.schema";
import { ContextWithParamsAndServices } from "./types/api.types";
import { initServices } from "./utils/service_provider.util";
import withValidatedRequest from "./middleware/with_validated_request_schema.middleware";
import { Bindings } from "hono/dist/types/types";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c: ContextWithParamsAndServices, next: Next) => {
  initServices(c);

  await next();
});

app.get("/", async (c: ContextWithParamsAndServices) => {
  const holidays = await c.services.holidayService.getAllHolidaysAsync();

  return c.json(holidays);
});

app.get(
  "/:year",
  withValidatedRequest(holidaySchema),
  async (c: ContextWithParamsAndServices<holidayParams>) => {
    const holidays = await c.services.holidayService.getHolidaysByYearAsync(
      c.req.paramData.year
    );

    return c.json(holidays, 200);
  }
);

app.notFound((c) => {
  return c.text("Not Found", 404);
});

app.onError((err, c) => {
  console.error(`${err}`);

  return c.text("An error has occurred", 500);
});

export default app;
