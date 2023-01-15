import { NextApiResponse } from "next";
import { AnyZodObject, ZodError } from "zod";
import { NextApiRequestWithParams } from "../types/next.types";

const withValidatedRequest = <TParams extends { params: unknown }>(
  schema: AnyZodObject,
  next: (
    req: NextApiRequestWithParams<TParams>,
    res: NextApiResponse
  ) => Promise<void>
) => {
  return async (
    req: NextApiRequestWithParams<TParams>,
    res: NextApiResponse
  ) => {
    try {
      const parsedSchema = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req = {
        ...req,
        body: parsedSchema.body,
        query: parsedSchema.body,
        params: parsedSchema.params,
      } as NextApiRequestWithParams<TParams>;

      next(req, res);
    } catch (error) {
      const { fieldErrors } = (error as ZodError<unknown>).flatten();

      return res.status(400).json({ error: fieldErrors });
    }
  };
};

export default withValidatedRequest;
