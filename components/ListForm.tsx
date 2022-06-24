import React, { useState } from 'react'
import { FormHelperText, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import cuid from 'cuid';
import { prisma } from '@prisma/client';
import styles from '../styles/Form.module.css'

// const newList = async(list:any) => {
//   const response = await fetch('/api/lists', {
//     method: 'POST',
//     body: JSON.stringify(list)
//   });
//   if(!response.ok){
//     throw new Error(response.statusText);
//   }
//   return await response.json();
// }


export const ListForm = ({ setList, list, todos, setTodos }:any ) => {
  const [newTodoName, setNewTodoName] = useState('');
  const [newTodos, setNewTodos] = useState('');



  const todosArray = newTodos.replace(/ /g, '').split(',');

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const newTodoList = {
      todoListId: cuid(),
      todoListName: newTodoName,
    }
    setList([...list, newTodoList])

    const allTodos = todosArray.map((todo:any) => {
      return {
        todoId: cuid(),
        listId: newTodoList.todoListId,
        todo: todo,
        isDone: false,
      }
    })
    setTodos([...todos, ...allTodos])
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField InputLabelProps={{style: { color: 'rgba(128, 128, 128, 0.7)', fontStyle: 'italic'}}} className={styles.form__input} label='Shopping list etc.' id="todo-name" aria-describedby="my-helper-text1" value={newTodoName} onChange={e => setNewTodoName(e.target.value)}/>
      <FormHelperText  className={styles.form__text} id="my-helper-text1">Please provide your todo list name.</FormHelperText>
      <TextField InputLabelProps={{style: { color: 'rgba(128, 128, 128, 0.7)', fontStyle: 'italic'}}} className={styles.form__input} label='bananas, oranges, milk etc.' id="todos" aria-describedby="my-helper-text2" value={newTodos} onChange={e => setNewTodos(e.target.value)}/>
      <FormHelperText className={styles.form__text} id="my-helper-text2">{`Please provide all your todos after coma.`}</FormHelperText>
      <Button variant="contained" type="submit" className={styles.form__btn}>SUBMIT</Button>
    </form>
  )
}
