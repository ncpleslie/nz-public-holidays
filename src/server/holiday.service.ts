import HolidayDto from "../models/dtos/holiday_dto.model";
import Holiday from "../models/entities/holiday.model";
import { prisma } from "./db";

export const getHolidays = async (year?: Date): Promise<HolidayDto[]> => {
  const holidays = await prisma.holiday.findMany({
    where: { date: undefined },
    include: { region: true },
  });

  return holidays.map((holiday) => new Holiday(holiday).toDto());
};
