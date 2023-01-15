import HolidayService from "../service/holiday.service";
import { HolidayDomain } from "../domain/holiday.domain";
import IHolidayDomain from "../domain/interfaces/holiday_domain.interface";

const domainServices = {
  holidayDomain: new HolidayDomain() as IHolidayDomain,
};

const applicationServices = {
  [HolidayService.name]: new HolidayService(domainServices.holidayDomain),
};

const serviceProvider = <IService>(serviceName: string): IService => {
  return applicationServices[serviceName] as IService;
};

export default serviceProvider;
