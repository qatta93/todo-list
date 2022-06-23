import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const {todo} = req.query
	console.log('elo')

	if(req.method === 'DELETE') {
		const todoToDelete = await prisma.todo.delete({
			where: {

			}
		})
		res.json(todo)
	} else {
		console.log("Todo couldn't be deleted");
	}
}