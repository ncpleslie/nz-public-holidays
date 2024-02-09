import HolidayService from "../service/holiday.service";
import { HolidayDomain } from "../domain/holiday.domain";
import IHolidayDomain from "../domain/interfaces/holiday_domain.interface";
import { ContextWithParamsAndServices } from "../types/api.types";
import { validateEnv } from "../env/server";

const domainServices = {
  holiday: undefined,
};

export const initServices = (c: ContextWithParamsAndServices) => {
  const validEnv = validateEnv(c.env);
  c.env = { ...validEnv };

  domainServices.holiday = new HolidayDomain(
    validEnv.DATABASE_URL,
    validEnv.NODE_ENV
  ) as IHolidayDomain;

  c.services = {
    holiday: new HolidayService(domainServices.holiday),
  };
};
