import { Holiday, Region } from "@prisma/client";

export type HolidayModel = Holiday & { region: Region };
