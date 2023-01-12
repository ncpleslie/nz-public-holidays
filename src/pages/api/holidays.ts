import { prisma } from "../../server/db";

export default async function handler(req, res) {
  const regions = await prisma?.region.findMany();
  const holidays = await prisma?.holiday.findFirst({
    include: { regions: true },
  });

  res.status(200).json({ regions, holidays });
}
