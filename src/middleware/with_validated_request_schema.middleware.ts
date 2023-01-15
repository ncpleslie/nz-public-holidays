import { Next } from "hono";
import { AnyZodObject, ZodError } from "zod";
import { ContextWithParamsAndServices } from "../types/api.types";

const withValidatedRequest = <TParams>(schema: AnyZodObject) => {
  return async (c: ContextWithParamsAndServices<TParams>, next: Next) => {
    try {
      const parsedSchema = await schema.parseAsync({
        paramData: c.req.paramData,
      });

      c.req.paramData = { ...c.req.paramData, ...parsedSchema.paramData };
    } catch (error) {
      console.error(error);
      const { fieldErrors } = (error as ZodError<unknown>).flatten();

      return c.json({ error: fieldErrors }, 400);
    }

    await next();
  };
};

export default withValidatedRequest;
