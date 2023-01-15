import { SafeParseError, ZodFormattedError } from "zod";
import { serverSchema } from "./schema";

export const formatErrors = (errors: ZodFormattedError<object, string>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${name}: ${(value._errors as string[]).join(", ")}\n`;
    })
    .filter(Boolean);

export const validateEnv = (env: Record<string, string>) => {
  const serverEnv = {};
  Object.keys(serverSchema.shape).forEach(
    (key) => (serverEnv[key] = env[key]?.trim())
  );

  const schemaParseResult = serverSchema.safeParse(serverEnv);

  if (!schemaParseResult.success) {
    console.error(
      "❌ Invalid environment variables:\n",
      ...formatErrors(
        (schemaParseResult as SafeParseError<object>).error.format()
      )
    );
    throw new Error("Invalid environment variables");
  }

  return { ...schemaParseResult.data };
};
