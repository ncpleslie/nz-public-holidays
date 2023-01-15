import { PrismaClient } from "@prisma/client";
import { env } from "../env/server.mjs";

export default abstract class BaseDomain {
  constructor() {
    this.db = new PrismaClient({
      log:
        env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  }

  protected readonly db: PrismaClient;
}
