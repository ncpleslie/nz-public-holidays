import Holiday from "../models/entities/holiday.model";
import BaseDomain from "./base.domain";
import IHolidayDomain from "./interfaces/holiday_domain.interface";

export class HolidayDomain extends BaseDomain implements IHolidayDomain {
  private readonly holidays;

  constructor() {
    super();
    this.holidays = this.db.holiday;
  }

  public async getHolidaysAsync(year?: Date): Promise<Holiday[]> {
    const holidays = await this.holidays.findMany({
      where: { date: { gte: year } },
      include: { region: true },
    });

    return holidays.map((holiday) => new Holiday(holiday));
  }
}
