import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_PROXY_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});
