import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {

  const {todoId, listId, todo, isDone} = req.body
  console.log(todoId)
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


  if(req.method === 'DELETE') {
    const {todoId, listId, todo, isDone} = req.body
    console.log(todoId)
		const todoToDelete = await prisma.todo.delete({
			where: {
				todoId: todoId,
			}
		})
		res.json(todoToDelete)
	} else {
		console.log("Todo couldn't be deleted");
	}
}

export default handler;
