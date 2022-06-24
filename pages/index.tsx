import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
import { ListForm } from '../components/ListForm'
import { TrashIcon } from '@heroicons/react/outline'

const prisma = new PrismaClient();

interface TodoListProps {
  todoListId: string,
  todoListName: string,
}

export const getServerSideProps = async () => {
  const todoList = await prisma.todoList.findMany();
  const todos = await prisma.todo.findMany();
  return {
    props: {
      initialTodos: todos,
      initialList: todoList,
    }
  };
}

const Home: NextPage =  ({ initialList, initialTodos }:any ) => {
  const [list, setList] = useState(initialList);
  const [todos, setTodos] = useState(initialTodos);
  const [newList, setNewList] = useState<boolean>(false);

  const router = useRouter();
  const { params } = router.query;

  const refreshData = () => {
    router.replace(router.asPath)
  }

  // const handleDelete = async (id: string) => {
  //   try {
  //    fetch(`http://localhost:3000/api/list/${id}`, {
  //      headers: {
  //        "Content-Type": "application/json",
  //      },
  //      method: 'DELETE'
  //    }).then(() => {
  //      refreshData()
  //    })
  //   } catch (error) {
  //    console.log(error); 
  //   }
  // }

  return (
    <div className={styles.home__container}>
      <section className={styles.home__intro}>
        <img src="img/bcg.png" alt="todo-list" />
        <h1>Do you know that having <b>TODO LIST</b> can potentially sabotage your productivity?</h1>
        <Button variant="contained" className= {newList === false ? styles.home__introBtn : styles.home__introBtnClose} onClick={() => setNewList(!newList)}>{newList === false ? 'NEW LIST' : 'CLOSE FORM'}</Button>
        {newList && <ListForm setList={setList} list={list} todos={todos} setTodos={setTodos}/>}
      </section>
      <section className={styles.home__lists}>
        <h1 className={styles.home__listsTitle}>TODO LISTS:</h1>
        {/* {list.map((todo:TodoListProps) => <li><a href={`/${todo.todoListName.toLowerCase()}`} key={todo.todoListId}><Button variant="outlined" className={styles.home__listsBtn}>{todo.todoListName}</Button></a><TrashIcon className={styles.list__trash} onClick={() => handleDelete(todo.todoListId)}/></li>)} */}
        {list.map((todo:TodoListProps) => <a href={`/${todo.todoListName.toLowerCase()}`} key={todo.todoListId}><Button variant="outlined" className={styles.home__listsBtn}>{todo.todoListName}</Button></a>)}

      </section>
    </div>
  )
}

export default Home
