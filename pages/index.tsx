import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
import { ListForm } from '../components/ListForm'

const prisma = new PrismaClient();

interface TodoListProps {
  todoListId: number,
  todoListName: string,
}

export const getServerSideProps = async () => {
  const todoList = await prisma.todoList.findMany();
  // console.log(todoList)
  const todo = await prisma.todo.findMany();
  // console.log(todo)
  return {
    props: {
      initialList: todoList
    }
  };
}

const newList = async(list:any) => {
  const response = await fetch('/api/lists', {
    method: 'POST',
    body: JSON.stringify(list)
  });
  if(!response.ok){
    throw new Error(response.statusText);
  }
  return await response.json();
}

const Home: NextPage =  ({ initialList }:any ) => {
  const [list, setList] = useState(initialList);
  console.log(list);
  const [currentPage, setCurrentPage] = useState<number>();
  const [newList, setNewList] = useState<boolean>(false);

  const router = useRouter();
  const { params } = router.query;

  return (
    <div className={styles.home__container}>
      <section className={styles.home__intro}>
        <img src="img/bcg.png" alt="todo-list" />
        <p>Do you know that having TODO LIST can potentially sabotage your productivity?</p>
        <Button variant="contained" onClick={() => setNewList(!newList)}>CREATE NEW LIST</Button>
        {newList && <ListForm setList={setList} list={list} />}
      </section>
      <section className={styles.home__lists}>
        <h1 className={styles.home__listsTitle}>TODO LISTS:</h1>
        {list.map((todo:TodoListProps) => <a href={`/${todo.todoListName.toLowerCase()}`} onClick={() => setCurrentPage(todo.todoListId)}><Button variant="outlined" className={styles.home__listsBtn}>{todo.todoListName}</Button></a>)}
      </section>
    </div>
  )
}

export default Home
