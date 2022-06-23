import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/List.module.css'
import { PrismaClient } from '@prisma/client';
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { TodoCard } from '../components/TodoCard'
import cuid from 'cuid';

const prisma = new PrismaClient();

interface FormData {
  todoId: string,
  listId: string,
  todo: string,
  isDone: boolean
}

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
  const findListId = findList[0]?.todoListId;


  const displayAllTodos = initialTodos.filter((listId:any) => listId.listId === findListId);
  const displayPendingTodos = initialTodos.filter((listId:any) => listId.listId === findListId && listId.isDone === false);
  const displayDoneTodos = initialTodos.filter((listId:any) => listId.listId === findListId && listId.isDone === true);

  const [filter, setFilter] = useState<string>('all')

  const [form, setForm] = useState<FormData>({todoId: cuid(), listId: findListId, todo: '', isDone: false})

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function create(data: FormData) {
    try {
      fetch('http://localhost:3000/api/todos', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => {
          setForm({todoId: '', listId: '', todo: '', isDone: false})
          refreshData()
      })
      } catch (error) {
        console.log(error);
      }
  }

  const handleSubmit = async (data: FormData) => {
    try {
     create(data) 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.list__container}>
      <a href="/" className={styles.list__nav}><ArrowLeftIcon className={styles.list__arrow}/>HOME</a>
      <section className={styles.list}>
        <article className={styles.list__items}>
        <h1>{params} todo list :</h1>
          <section className={styles.list__addItem}>
          <form onSubmit={e => {
            e.preventDefault()
            handleSubmit(form)
            }} className=''>
            <input type="text"
              placeholder="Todo"
              value={form.todo}
              onChange={e => setForm({...form, todo: e.target.value})}
              className=""
            />
            <button type="submit" className="">Add</button>
          </form>
          </section>
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
    </div>
  )
}

export default list;