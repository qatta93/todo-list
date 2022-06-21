import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const listData = JSON.parse(req.body);
  const newList = await prisma.todoList.create({
    data: listData
  })
  res.json({ message: 'hello world' })
}

export default handler;
