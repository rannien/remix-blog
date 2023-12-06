interface City {
  id: number;
  county_id: number;
  name: string;
}

export async function getCities(): Promise<City[]> {
  return [
    {
      id: 1,
      county_id: 1,
      name: "Orosháza",
    },
    {
      id: 2,
      county_id: 2,
      name: "Szentes",
    },
  ];
}

// export async function getCity(id: number) {
//   return prisma.post.findUnique({ where: { id } });
// }
