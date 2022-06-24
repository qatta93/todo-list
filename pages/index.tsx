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

interface TodoProps {
  todoId: string,
  listId: string,
  todo: string,
  isDone: boolean
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
  const [newList, setNewList] = useState<boolean>(false);
  
  const refreshData = () => {
    router.replace(router.asPath)
  }

  const router = useRouter();
  const { params } = router.query;


  const handleDelete = async (id: string) => {
    if(initialTodos.some((todo:TodoProps) => todo.listId === id)){
      try {
        fetch(`http://localhost:3000/api/todo/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: 'DELETE'
        }).then(() => {
         setTimeout(function(){window.location.reload();},0.001);
          refreshData()
          })
       } catch (error) {
        console.log(error); 
       }
    }
    try {
     fetch(`http://localhost:3000/api/list/${id}`, {
       headers: {
         "Content-Type": "application/json",
       },
       method: 'DELETE'
     }).then(() => {
      setTimeout(function(){window.location.reload();},0.001);
       refreshData()
     })
    } catch (error) {
     console.log(error); 
    }
  }

  return (
    <div className={styles.home__container}>
      <section className={styles.home__intro}>
        <img src="img/bcg.png" alt="todo-list" />
        <h1>Do you know that having <b>TODO LIST</b> can potentially sabotage your productivity?</h1>
        <Button variant="contained" className= {newList === false ? styles.home__introBtn : styles.home__introBtnClose} onClick={() => setNewList(!newList)}>{newList === false ? 'NEW LIST' : 'CLOSE FORM'}</Button>
        {newList && <ListForm />}
      </section>
      <section className={styles.home__lists}>
        <h1 className={styles.home__listsTitle}>TODO LISTS:</h1>
        {list.map((todo:TodoListProps) => <li key={todo.todoListId}><a href={`/${todo.todoListName.toLowerCase()}`}><Button variant="outlined" className={styles.home__listsBtn}>{todo.todoListName}</Button></a><TrashIcon className={styles.list__trash} onClick={() => handleDelete(todo.todoListId)}/></li>)}
      </section>
    </div>
  )
}

export default Home
