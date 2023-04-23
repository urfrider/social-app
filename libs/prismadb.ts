import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const client = globalThis.prisma || new PrismaClient();

// prevent global state from being mutated in production
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default prisma;
