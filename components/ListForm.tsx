import React, { useEffect, useState } from 'react'
import { FormHelperText, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import cuid from 'cuid';
import styles from '../styles/Form.module.css'
import { useRouter } from 'next/router'


interface TodoListProps {
  todoListId: string,
  todoListName: string,
}

export const ListForm = ({ setList, list, todos, setTodos }:any ) => {

  const router = useRouter()
  
  const [form, setForm] = useState<TodoListProps>({todoListId: cuid(), todoListName: ''})

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function create(data: TodoListProps) {
    try {
      fetch('http://localhost:3000/api/lists', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => {
          console.log('post is working!')
          setForm({todoListId: '', todoListName: ''})
          refreshData()
      })
      } catch (error) {
        console.log(error);
      }
  }

  const handleSubmit = async (data: TodoListProps) => {
    try {
     create(data) 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={e => 
      {e.preventDefault()
      handleSubmit(form)
      }}
      >
      <TextField value={form.todoListName} InputLabelProps={{style: { color: 'rgba(128, 128, 128, 0.7)', fontStyle: 'italic'}}} className={styles.form__input} label='Shopping list etc.' id="todo-name" aria-describedby="my-helper-text1"  onChange={e => setForm({...form, todoListName: e.target.value})}/>
      <FormHelperText className={styles.form__text} id="my-helper-text1">Please provide your todo list name.</FormHelperText>
      <Button variant="contained" type="submit" className={styles.form__btn}>SUBMIT</Button>
    </form>
  )
}
