import { Holiday, Region } from "@prisma/client/edge";

export type HolidayModel = Holiday & { region: Region };
