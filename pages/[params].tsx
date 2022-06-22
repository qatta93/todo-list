import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/List.module.css'
import { PrismaClient } from '@prisma/client';
import Button from '@mui/material/Button';
import { style } from '@mui/system';
import { TrashIcon } from '@heroicons/react/outline'
import { ArrowLeftIcon } from '@heroicons/react/solid'

const prisma = new PrismaClient();

export const getServerSideProps = async () => {
  const todos = await prisma.todo.findMany();
  const todoList = await prisma.todoList.findMany();
  return {
    props: {
      initialTodos: todos,
      initialTodoList: todoList,
    }
  };
}

export const list = ({ initialTodos, initialTodoList }:any ) => {
  const router = useRouter()
  const {params} = router.query
  const findList = initialTodoList.filter((name:any) => name.todoListName.toLowerCase() === params);
  const findListId = findList[0].todoListId;
  console.log(initialTodos)
  const displayTodos = initialTodos.filter((listId:any) => listId.listId === findListId);
  const [isDone, setIsDone] = useState<boolean>(false);

  console.log(isDone)
  return (
    <section className={styles.list}>
      <a href="/" className={styles.list__nav}><ArrowLeftIcon className={styles.list__arrow}/>HOME</a>
      <h1>{params} todo list :</h1>
      <article className={styles.list__items}>
        {displayTodos.map((todo: any) => <Button className={isDone === false? styles.list__btn : styles.list__btnDone} onClick={() => setIsDone(!isDone)}><img className={styles.list__checkbox} src={isDone === true? 'img/checkbox_done.png' : 'img/checkbox.png'} />{todo.todo}<TrashIcon className={styles.list__trash}/></Button>)}
      </article>
    </section>
  )
}

export default list;