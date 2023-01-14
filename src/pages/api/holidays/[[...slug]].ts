import { createRouter, expressWrapper } from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import withValidatedRequest from "../../../utils/with_validated_request_schema";
import { NextApiRequestWithParams } from "../../../types/next.types";
import {
  holidaySchema,
  holidayType,
} from "../../../models/holiday_params.schema";
import HolidayService from "../../../service/holiday.service";
import serviceProvider from "../../../utils/service_provider.util";
import IHolidayService from "../../../service/interfaces/holiday_service.interface";

const router = createRouter<
  NextApiRequestWithParams<holidayType>,
  NextApiResponse
>();
const app = router.use(expressWrapper(Cors()));

const holidayService = serviceProvider<IHolidayService>(HolidayService.name);

app.get("/api/holidays", async (_, res) => {
  const holidays = await holidayService.getAllHolidaysAsync();
  res.status(200).json(holidays);
});

app.get(
  "/api/holidays/:year",
  withValidatedRequest(holidaySchema, async (req, res) => {
    const holidays = await holidayService.getHolidaysByYearAsync(
      req.params.year
    );

    res.status(200).json(holidays);
  })
);

export default router.handler({
  onError(err, req, res) {
    console.error((err as Error).message);
    res.status(500).end("Something went wrong");
  },
  onNoMatch: (_, res) => {
    res.status(404).end("Not Found");
  },
});
