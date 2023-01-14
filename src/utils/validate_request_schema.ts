import { NextApiRequest, NextApiResponse } from "next";
import { AnyZodObject } from "zod";

const validateRequest = async (
  schema: AnyZodObject,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    throw new Error("test");

    return await schema.parseAsync({
      body: req.body,
      query: req.query,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default validateRequest;
