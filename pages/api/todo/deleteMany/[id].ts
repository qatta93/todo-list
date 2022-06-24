import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const id = req.query.id;

	if(req.method === 'DELETE') {
		const todoToDelete = await prisma.todo.deleteMany({
			where: {
				//@ts-ignore
				listId: id,
			}
		})
		res.json(todoToDelete)
	} else {
		console.log("Todo couldn't be deleted");
	}
}