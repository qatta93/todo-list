import React, { useState } from 'react'
import { FormHelperText, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import cuid from 'cuid';
import styles from '../styles/Form.module.css'
import { useRouter } from 'next/router'
import { TodoListProps } from '../types/types';

export const ListForm = () => {

  const router = useRouter()
  
  const [form, setForm] = useState<TodoListProps>({todoListId: cuid(), todoListName: ''})

  async function create(data: TodoListProps) {
    try {
      fetch('http://localhost:3000/api/lists', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => {
          setForm({todoListId: '', todoListName: ''})
          setTimeout(function(){window.location.reload();},0.0001);
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
