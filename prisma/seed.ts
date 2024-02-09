import { PrismaClient } from "@prisma/client";
import regions from "./regions.json";
import holidays from "./holidays.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Deleting tables");
  await prisma.holiday.deleteMany();
  await prisma.region.deleteMany();

  console.log("Adding regions");
  for await (const region of regions) {
    await prisma.region.create({ data: { id: region.id, name: region.name } });
  }

  console.log("Adding holiday");
  for await (const [year, scopedHolidays] of Object.entries(holidays)) {
    for await (const holiday of scopedHolidays) {
      console.log(`Adding ${holiday.id} for ${year}`);
      await prisma.holiday.create({
        data: {
          id: holiday.id,
          name: holiday.name,
          date: new Date(`${holiday.date} ${year}`),
          observedDate: new Date(`${holiday.observed} ${year}`),
          region: {
            connect: { id: holiday.region },
          },
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
