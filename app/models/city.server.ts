import { City } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getCities(countyId: number | undefined = undefined) {
  if (!countyId) {
    return prisma.city.findMany();
  }

  return prisma.city.findMany({ where: { countyId } });
}

export async function getCity(id: number) {
  return prisma.city.findUnique({ where: { id } });
}

export async function store(city: City) {
  return prisma.city.create({ data: city });
}
