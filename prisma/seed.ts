import { prisma } from "../src/server/db";

async function main() {
  await prisma.region.deleteMany();
  await prisma.holiday.deleteMany();
  const regions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "auckland",
      name: "Auckland",
    },
    {
      id: "canterbury",
      name: "Canterbury",
    },
    {
      id: "canterbury-south",
      name: "Canterbury South",
    },
    {
      id: "chatham-islands",
      name: "Chatham Islands",
    },
    {
      id: "hawkes-bay",
      name: "Hawke's Bay",
    },
    {
      id: "marlborough",
      name: "Marlborough",
    },
    {
      id: "nelson",
      name: "Nelson",
    },
    {
      id: "otago",
      name: "Otago",
    },
    {
      id: "southland",
      name: "Southland",
    },
    {
      id: "taranaki",
      name: "Taranaki",
    },
    {
      id: "wellington",
      name: "Wellington",
    },
    {
      id: "westland",
      name: "Westland",
    },
  ];

  for await (const region of regions) {
    await prisma.region.create({ data: { id: region.id, name: region.name } });
  }

  await prisma.holiday.create({
    data: {
      id: "new-years-day",
      name: "New Year's Day",
      date: new Date(2023, 0, 1),
      observed: new Date(2023, 0, 3),
    },
  });

  await prisma.region.update({
    where: { id: "all" },
    data: {
      holidays: {
        set: [
          {
            id: "new-years-day",
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
