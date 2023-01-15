import Holiday from "../models/entities/holiday.model";
import BaseDomain from "./base.domain";
import IHolidayDomain from "./interfaces/holiday_domain.interface";

export class HolidayDomain extends BaseDomain implements IHolidayDomain {
  constructor(dbUrl: string, environment: string) {
    super(dbUrl, environment);
  }

  public async getHolidaysAsync(year?: Date): Promise<Holiday[]> {
    const holidays = await this.db.holiday.findMany({
      where: {
        date: {
          gte: year
            ? new Date(
                Date.UTC(
                  year.getFullYear(),
                  year.getMonth(),
                  year.getDay(),
                  year.getHours(),
                  year.getMinutes(),
                  year.getSeconds()
                )
              )
            : undefined,
        },
      },
      include: { region: true },
    });

    return holidays.map((holiday) => new Holiday(holiday));
  }
}
