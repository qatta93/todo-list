import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { TrashIcon } from '@heroicons/react/outline'
import styles from '../styles/TodoCard.module.css'

interface FormData {
  todoId: string,
  listId: string,
  todo: string,
  isDone: boolean
}

export const TodoCard = ({ todo }:any) => {
  const [isDone, setIsDone] = useState<boolean>(todo.isDone);
  const handleDelete = async (data: FormData) => {
    try {
    //  delete(data) 
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button className={todo.isDone === false ? styles.list__btn : styles.list__btnDone} onClick={() => setIsDone(!isDone)}><img className={styles.list__checkbox} src={isDone === true? 'img/checkbox_done.png' : 'img/checkbox.png'} />{todo.todo}<TrashIcon className={styles.list__trash} onClick={() => handleDelete}/></Button>
  )
}

