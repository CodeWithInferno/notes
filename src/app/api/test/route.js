// pages/api/test.ts
import  { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as test;`;
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to the database' });
  }
}
