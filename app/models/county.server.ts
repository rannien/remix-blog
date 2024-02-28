import { prisma } from "~/db.server";

export async function getCounties() {
  return prisma.county.findMany();
}
