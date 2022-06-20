import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TodoListProps {
  todoListId: number,
  todoListName: string
}

 // @ts-ignore:next-line
const Home: Promise<any> = async () => {
  const todoList = await prisma.todoList.findMany();
  console.log(todoList)

  return (
    <div className={styles.home__container}>
      <section className={styles.home__intro}>
        <img src="img/bcg.png" alt="todo-list" />
        <p>{todoList}</p>
        <p>Do you know that having TODO LIST can potentially sabotage your productivity?</p>
        <Button variant="contained">CREATE NEW LIST</Button>
      </section>
      <section className={styles.home__lists}>
        <h1 className={styles.home__listsTitle}>TODO LISTS:</h1>
        {todoList.map((todo:TodoListProps) => <Button variant="outlined" className={styles.home__listsBtn}>{todo.todoListName}</Button>)}
      </section>
    </div>
  )
}

export default Home
