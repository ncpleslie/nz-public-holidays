import { serverSchema } from "./schema";

export const formatErrors = (errors: any) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in (value as any))
        return `${name}: ${(value as any)._errors.join(", ")}\n`;
    })
    .filter(Boolean);

export const validateEnv = (env: Record<string, string>) => {
  let serverEnv = {};
  Object.keys(serverSchema.shape).forEach(
    (key) => (serverEnv[key] = env[key]?.trim())
  );

  const schemaParseResult = serverSchema.safeParse(serverEnv);

  if (!schemaParseResult.success) {
    console.error(
      "❌ Invalid environment variables:\n",
      ...formatErrors((schemaParseResult as any).error.format())
    );
    throw new Error("Invalid environment variables");
  }

  return { ...schemaParseResult.data };
};
