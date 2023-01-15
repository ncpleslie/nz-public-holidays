import { NextApiRequest } from "next";

export type NextApiRequestWithParams<TParams = { params: unknown }> =
  NextApiRequest & TParams;
