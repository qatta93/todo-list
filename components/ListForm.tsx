import React from 'react'

import FormControl from '@mui/material/FormControl';
import { FormHelperText, Input, InputLabel } from '@mui/material';

export const ListForm = () => {
  return (
    <FormControl>
      {/* <InputLabel htmlFor="todo-name">Todo List Name</InputLabel> */}
      <Input id="todo-name" aria-describedby="my-helper-text1"/>
      <FormHelperText id="my-helper-text1">Please provide your todo list name.</FormHelperText>

      {/* <InputLabel htmlFor="todos">cooking, shopping, cleaning etc.</InputLabel> */}
      <Input id="todos" aria-describedby="my-helper-text2" />
      <FormHelperText id="my-helper-text2">{`Please provide all your todos after coma (shopping, cleaning etc.)`}</FormHelperText>
    </FormControl>
  )
}
