import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {

  const {todoId, listId, todo, isDone} = req.body;
  
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
}

export default handler;
