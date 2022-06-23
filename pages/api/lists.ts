import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const {todoListId, todoListName} = req.body
  try {
    const newTodoList = await prisma.todoList.create({
      data: {
        todoListId,
        todoListName,
      }
    })
    res.status(200).json(newTodoList)
	} catch (error) {
		console.log("Failure");
	}
}

export default handler;
