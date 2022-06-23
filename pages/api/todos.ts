import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const {todoId, listId, todo, isDone} = req.body
  try {
    const newTodo = await prisma.todo.create({
      data: {
        todoId,
        listId,
        todo,
        isDone
      }
    })
    res.status(200).json(newTodo)
	} catch (error) {
		console.log("Failure");
	}
}

export default handler;
