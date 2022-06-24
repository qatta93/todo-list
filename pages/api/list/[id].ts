import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const id = req.query.id;

	if(req.method === 'DELETE') {
		const todoListToDelete = await prisma.todoList.delete({
			where: {
				//@ts-ignore
				todoListId: id,
			}
		})
		res.json(todoListToDelete)
	} else {
		console.log("Todo List couldn't be deleted");
	}
}