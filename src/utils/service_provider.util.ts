import HolidayService from "../service/holiday.service";
import { HolidayDomain } from "../domain/holiday.domain";
import IHolidayDomain from "../domain/interfaces/holiday_domain.interface";
import { ContextWithParamsAndServices } from "../types/api.types";
import { validateEnv } from "../env/server";

const domainServices = {
  holidayDomain: undefined,
};

export const initServices = (c: ContextWithParamsAndServices) => {
  const validEnv = validateEnv(c.env);
  c.env = { ...validEnv };

  domainServices.holidayDomain = new HolidayDomain(
    validEnv.DATABASE_PROXY_URL,
    validEnv.NODE_ENV
  ) as IHolidayDomain;

  c.services = {
    holidayService: new HolidayService(domainServices.holidayDomain),
  };
};
