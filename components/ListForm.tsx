import React, { useState } from 'react'
import { FormHelperText, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import cuid from 'cuid';

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

export const ListForm = ({ setList, list }:any ) => {
  const [todoName, setTodoName] = useState('');
  const [todos, setTodos] = useState('');

  const todosArray = todos.replace(/ /g, '').split(',');





  // const allTodos = todosArray.map((todo:any) => {
  //   const newTodo = {
  //     todoId: cuid(),
  //     listId: newTodoList.todoListId,
  //     todo: todo,
  //   }
  // })

  // console.log('im todos', allTodos)


  // const handleSubmit = (data:any, e:any) => {
  const handleSubmit = (e:any) => {
    e.preventDefault();

    const newTodoList = {
      todoListId: cuid(),
      todoListName: todoName,
    }

    setList([...list, newTodoList])
    // try {
    //   await saveContact(data);
    //   setContacts([...contacts, data]);
    //   e.target.reset();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <InputLabel htmlFor="todo-name">Todo List Name</InputLabel> */}
      <TextField id="todo-name" aria-describedby="my-helper-text1" value={todoName} onChange={e => setTodoName(e.target.value)}/>
      <FormHelperText id="my-helper-text1">Please provide your todo list name.</FormHelperText>
      <TextField id="todos" aria-describedby="my-helper-text2" value={todos} onChange={e => setTodos(e.target.value)}/>
      <FormHelperText id="my-helper-text2">{`Please provide all your todos after coma (shopping, cleaning etc.)`}</FormHelperText>
      <Button variant="contained" type="submit">SUBMIT</Button>
    </form>
  )
}
