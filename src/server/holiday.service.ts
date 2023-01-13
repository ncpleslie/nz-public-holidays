import { Holiday as HolidayModel, Region } from "@prisma/client";
import { prisma } from "./db";

abstract class BaseDbEntity {
  constructor(baseDbEntityDto: BaseDbEntityDto) {
    this.id = baseDbEntityDto.id;
  }

  public id: string;

  public createDto<TDto extends BaseDbEntityDto>(dto: TDto): void {
    dto.id = this.id;
  }
}

abstract class BaseDbEntityDto {
  public id: string;
}

class Holiday extends BaseDbEntity {
  constructor(holiday: HolidayModel);
  constructor(holiday: HolidayDto) {
    super(holiday);

    this.name = holiday.name;
  }

  public name: string;

  public toDto(): HolidayDto {
    const dto = new HolidayDto();
    dto.name = this.name;

    this.createDto(dto);

    return dto;
  }
}

class HolidayDto extends BaseDbEntityDto {
  public name: string;
}

export const getHolidays = async (
  yearFrom?: Date,
  yearTo?: Date
): Promise<HolidayDto[]> => {
  const holidays = await prisma.holiday.findMany({
    where: { date: undefined },
    include: { region: true },
  });

  return holidays.map((holiday) => new Holiday(holiday).toDto());
};
