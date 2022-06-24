export interface TodoListProps {
  todoListId: string,
  todoListName: string,
}

export interface TodoProps {
  todoId: string,
  listId: string,
  todo: string,
  isDone: boolean
}