import { createRouter, expressWrapper } from "next-connect";
import { NextApiResponse } from "next";
import Cors from "cors";
import { getHolidays } from "../../../server/holiday.service";
import withValidateRequest from "../../../utils/validate_request_schema";
import { NextApiRequestWithParams } from "../../../types/next.types";
import {
  holidaySchema,
  holidayType,
} from "../../../models/holiday_params.schema";

const router = createRouter<
  NextApiRequestWithParams<holidayType>,
  NextApiResponse
>();
const app = router.use(expressWrapper(Cors()));

app.get("/api/holidays", async (_, res) => {
  const holidays = await getHolidays();
  res.status(200).json(holidays);
});

app.get(
  "/api/holidays/:year",
  withValidateRequest(holidaySchema, (req, res) => {
    const holidays = getHolidays(req.params.year);

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
