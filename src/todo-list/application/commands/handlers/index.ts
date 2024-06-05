import { CreateTodoListHandler } from './create-todo-list.handler';
import { DeleteTodoListHandler } from './delete-todo-list.handler';
import { EditTodoListHandler } from './edit-todo-list.handler';

export const TodoListCommandHandlers = [
  CreateTodoListHandler,
  EditTodoListHandler,
  DeleteTodoListHandler,
];
