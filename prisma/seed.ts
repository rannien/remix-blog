import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post",
      markdown: `
  # This is my first post
  
  Isn't it great?
      `.trim(),
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
      markdown: `
  # 90s Mixtape
  
  - I wish (Skee-Lo)
  - This Is How We Do It (Montell Jordan)
  - Everlong (Foo Fighters)
  - Ms. Jackson (Outkast)
  - Interstate Love Song (Stone Temple Pilots)
  - Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
  - Just a Friend (Biz Markie)
  - The Man Who Sold The World (Nirvana)
  - Semi-Charmed Life (Third Eye Blind)
  - ...Baby One More Time (Britney Spears)
  - Better Man (Pearl Jam)
  - It's All Coming Back to Me Now (Céline Dion)
  - This Kiss (Faith Hill)
  - Fly Away (Lenny Kravits)
  - Scar Tissue (Red Hot Chili Peppers)
  - Santa Monica (Everclear)
  - C'mon N' Ride it (Quad City DJ's)
      `.trim(),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  const counties = [
    {
      name: "Bács-Kiskun",
    },
    {
      name: "Baranya",
    },
    {
      name: "Békés",
    },
    {
      name: "Borsod-Abaúj-Zemplén",
    },
    {
      name: "Csongrád-Csanád",
    },
    {
      name: "Fejér",
    },
    {
      name: "Győr-Moson-Sopron",
    },
    {
      name: "Hajdú-Bihar",
    },
    {
      name: "Heves",
    },
    {
      name: "Jász-Nagykun-Szolnok",
    },
    {
      name: "Komárom-Esztergom",
    },
    {
      name: "Nógrád",
    },
    {
      name: "Pest",
    },
    {
      name: "Somogy",
    },
    {
      name: "Szabolcs-Szatmár-Bereg",
    },
    {
      name: "Tolna",
    },
    {
      name: "Vas",
    },
    {
      name: "Veszprém",
    },
    {
      name: "Zala",
    },
  ];

  counties.forEach(async (county, index) => {
    await prisma.county.upsert({
      where: { id: index + 1 },
      update: county,
      create: county,
    });
  });

  const cities = [
    {
      name: "Szeged",
      countyId: 5,
    },
    {
      name: "Orosháza",
      countyId: 3,
    },
  ];

  cities.forEach(async (city, index) => {
    await prisma.city.upsert({
      where: { id: index + 1 },
      update: city,
      create: city,
    });
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
