import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { TrashIcon } from '@heroicons/react/outline'
import styles from '../styles/TodoCard.module.css'
import { useRouter } from 'next/router'

export const TodoCard = ({ todo }:any) => {
  const [isDone, setIsDone] = useState<boolean>(todo.isDone);

  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const handleDelete = async (id: string) => {
      try {
       fetch(`http://localhost:3000/api/todo/${id}`, {
         headers: {
           "Content-Type": "application/json",
         },
         method: 'DELETE'
       }).then(() => {
         refreshData()
       })
      } catch (error) {
       console.log(error); 
      }
    }

    const handleIsDone = async (id: string) => {
      try {
       fetch(`http://localhost:3000/api/todo/${id}`, {
         headers: {
           "Content-Type": "application/json",
           'Location': `http://localhost:3000/api/todo/${id}`,
         },
         method: 'UPDATE'
       }).then(() => {
         refreshData()
         console.log('update')
       })
      } catch (error) {
       console.log(error); 
      }
    }

  return (
    <Button className={isDone === false ? styles.list__btn : styles.list__btnDone}><img onClick={() => setIsDone(!isDone)} className={styles.list__checkbox} src={isDone === true? 'img/checkbox_done.png' : 'img/checkbox.png'} />{todo.todo}<TrashIcon className={styles.list__trash} onClick={() => handleDelete(todo.todoId)}/></Button>
  )
}


