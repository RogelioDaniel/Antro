import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Always create a fresh client in dev so schema changes (new models) are
// picked up without a full server restart.
export const db =
  process.env.NODE_ENV !== 'production'
    ? new PrismaClient({ log: ['error'] })
    : globalForPrisma.prisma ?? new PrismaClient({ log: ['error'] })

if (process.env.NODE_ENV === 'production') globalForPrisma.prisma = db