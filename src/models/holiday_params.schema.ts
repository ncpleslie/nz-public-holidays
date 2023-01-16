import { z } from "zod";

// TODO: Move these values to a configuration file
const currentYear = "2023-01-01";
const startCurrentYear = new Date(new Date(currentYear).getFullYear(), 0, 1);
const lastSupportedYear = new Date(
  new Date(currentYear).getFullYear() + 1,
  0,
  1
);

export const holidaySchema = z.object({
  paramData: z.object({
    year: z.coerce
      .date({
        required_error: "A valid year is required in YYYY format",
        invalid_type_error: "A valid year is required in YYYY format",
      })
      .min(startCurrentYear, {
        message: "Dates before this year are not allowed",
      })
      .max(lastSupportedYear, {
        message: "This year is beyond the support years",
      })
      .default(startCurrentYear),
  }),
});

export type holidayType = z.infer<typeof holidaySchema>;

export type holidayParams = { req: holidayType };
