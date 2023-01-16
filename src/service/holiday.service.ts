import HolidayDto from "../models/dtos/holiday_dto.model";
import IHolidayDomain from "../domain/interfaces/holiday_domain.interface";
import IHolidayService from "./interfaces/holiday_service.interface";
import Holiday from "../models/entities/holiday.model";

export default class HolidayService implements IHolidayService {
  constructor(protected holidayDomain: IHolidayDomain) {}

  public async getAllHolidaysAsync(): Promise<Record<string, HolidayDto[]>> {
    const holidays = await this.holidayDomain.getHolidaysAsync();

    return this.sortHolidays(holidays).reduce(
      (prevHolidays: Record<string, HolidayDto[]>, currentHoliday) => {
        const currentHolidayDto = currentHoliday.toDto();
        const yearKey = currentHolidayDto.date.substring(0, 4);
        if (prevHolidays[yearKey]) {
          prevHolidays[yearKey]?.push(currentHolidayDto);

          return prevHolidays;
        }

        prevHolidays[yearKey] = [currentHolidayDto];

        return prevHolidays;
      },
      {} as Record<string, HolidayDto[]>
    );
  }

  public async getHolidaysByYearAsync(year: Date): Promise<HolidayDto[]> {
    const holidays = await this.holidayDomain.getHolidaysAsync(year);

    return this.sortHolidays(holidays)
      .sort((aHoliday, bHoliday) => {
        return aHoliday.date.getTime() - bHoliday.date.getTime();
      })
      .map((holiday) => holiday.toDto());
  }

  private sortHolidays(holidays: Holiday[]) {
    return holidays.sort((aHoliday, bHoliday) => {
      return aHoliday.date.getTime() - bHoliday.date.getTime();
    });
  }
}
