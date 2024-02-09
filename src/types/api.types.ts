import { Context } from "hono";
import IHolidayService from "../service/interfaces/holiday_service.interface";

export type ContextWithParamsAndServices<
  TParams = {
    req: {
      paramData: unknown;
    };
  }
> = Context & TParams & { services: { holiday: IHolidayService } };
