import { PrismaClient } from "@prisma/client/edge";

export default abstract class BaseDomain {
  constructor(dbUrl: string, environment: string) {
    this.db = new PrismaClient({
      datasources: { db: { url: dbUrl } },
      log:
        environment === "development" ? ["query", "error", "warn"] : ["error"],
    });
  }

  protected readonly db: PrismaClient;
}
