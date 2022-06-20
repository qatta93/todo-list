import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import { PrismaClient } from '@prisma/client';
import { useState } from 'react';

const prisma = new PrismaClient();

interface TodoListProps {
  todoListId: number,
  todoListName: string,
}

interface TodoListArrayProps {
  todoList: TodoListProps[],
}

export const getServerSideProps = async () => {
  const todoList = await prisma.todoList.findMany();
  console.log(todoList)
  return {
    props: {
      initialList: todoList
    }
  };
}

const Home: NextPage =  ({ initialList }:any ) => {
  const [list, setList] = useState(initialList)
  return (
    <div className={styles.home__container}>
      <section className={styles.home__intro}>
        <img src="img/bcg.png" alt="todo-list" />
        <p>Do you know that having TODO LIST can potentially sabotage your productivity?</p>
        <Button variant="contained">CREATE NEW LIST</Button>
      </section>
      <section className={styles.home__lists}>
        <h1 className={styles.home__listsTitle}>TODO LISTS:</h1>
        {list.map((todo:TodoListProps) => <Button variant="outlined" className={styles.home__listsBtn}>{todo.todoListName}</Button>)}
      </section>
    </div>
  )
}

export default Home
