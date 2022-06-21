import React from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/List.module.css'
import { PrismaClient } from '@prisma/client';
import Button from '@mui/material/Button';

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

  return (
    <section className={styles.list}>
      <h1>{params} todo list :</h1>
      <article className={styles.list__items}>
        {displayTodos.map((todo: any) => <Button variant="outlined" className={styles.list__btn}>{todo.todo}</Button>)}
      </article>
    </section>
  )
}

export default list;