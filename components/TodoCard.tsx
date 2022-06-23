import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { TrashIcon } from '@heroicons/react/outline'
import styles from '../styles/TodoCard.module.css'
import { Prisma, PrismaClient } from '@prisma/client';




export const TodoCard = ({ todo }:any) => {
  const [isDone, setIsDone] = useState<boolean>(todo.isDone);
  // @ts-ignore
  // const updateUser = await prisma.todo.update({
  //   where: {
  //     todoId: todo.todoId,
  //   },
  //   data: {
  //     isDone: isDone,
  //   },
  // })
  console.log(isDone)
  return (
    <Button className={todo.isDone === false ? styles.list__btn : styles.list__btnDone} onClick={() => setIsDone(!isDone)}><img className={styles.list__checkbox} src={isDone === true? 'img/checkbox_done.png' : 'img/checkbox.png'} />{todo.todo}<TrashIcon className={styles.list__trash}/></Button>
  )
}




// po kliknieciu na todo, zmien w bazie danych