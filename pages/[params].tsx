import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/List.module.css'
import { PrismaClient } from '@prisma/client';
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { TodoCard } from '../components/TodoCard'

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

  const displayAllTodos = initialTodos.filter((listId:any) => listId.listId === findListId);
  const displayPendingTodos = initialTodos.filter((listId:any) => listId.listId === findListId && listId.isDone === false);
  const displayDoneTodos = initialTodos.filter((listId:any) => listId.listId === findListId && listId.isDone === true);

  const [filter, setFilter] = useState<string>('all')

  return (
    <section className={styles.list}>
      <a href="/" className={styles.list__nav}><ArrowLeftIcon className={styles.list__arrow}/>HOME</a>
      <h1>{params} todo list :</h1>
      <article className={styles.list__items}>
        <section className={styles.list__filter}>
          <p>FILTER TODOS:</p>
          <button className={styles.list__filterBtnPending} onClick={() => setFilter('pending')}>PENDING</button>
          <button className={styles.list__filterBtnDone} onClick={() => setFilter('done')}>DONE</button>
          <button className={styles.list__filterBtnAll} onClick={() => setFilter('all')}>ALL</button>
        </section>
        {filter === 'all' && displayAllTodos.map((todo: any) => <TodoCard key={todo.todoId} todo={todo}/>)}
        {filter === 'pending' && displayPendingTodos.map((todo: any) => <TodoCard key={todo.todoId} todo={todo}/>)}
        {filter === 'done' && displayDoneTodos.map((todo: any) => <TodoCard key={todo.todoId} todo={todo}/>)}
      </article>
    </section>
  )
}

export default list;