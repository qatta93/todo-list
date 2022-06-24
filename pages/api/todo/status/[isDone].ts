import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const id = req.query.id;
	console.log(id)
	const {status} = req.query
  console.log(status)

	if(req.method === 'UPDATE') {
		const todoUpdate = await prisma.todo.update({
			where: {
				//@ts-ignore
				todoId: id,
			},
			data: {
				//@ts-ignore
				isDone: status,
			}
		})
		res.json(todoUpdate)
	} else {
		console.log("Todo couldn't be updated");
	}
}