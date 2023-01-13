import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { Prisma } from "@prisma/client";
import { getHolidays } from "../../server/holiday.service";

const holidayRegion: Prisma.HolidaySelect = {
  region: true,
};

const cors = Cors({ methods: ["GET"] });

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await runMiddleware(req, res, cors);
    console.log(req.query);
    const holidays = await getHolidays();

    res.status(200).json(holidays);
  } catch {
    res.status(500).send({ error: "An unknown error has occurred" });
  }
}
