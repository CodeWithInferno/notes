import { PrismaClient } from '@prisma/client'

// This singleton pattern prevents creating too many instances of PrismaClient
// in a serverless environment, which would exhaust the database connection pool.

const prismaClientSingleton = () => {
  return new PrismaClient()
}

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
