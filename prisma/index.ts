import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient, type Dust } from '../generated/prisma/client'
import { env } from "node:process";

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const adapter = new PrismaMariaDb(env["DATABASE_URL"]!);
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }
export type { Dust };