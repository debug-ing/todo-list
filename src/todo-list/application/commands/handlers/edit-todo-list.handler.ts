import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditTodoListCommand } from '../impl/edit-todo-list.command';
import { TodoList } from '../../../../todo-list/domain/todo-list.model';
import { TodoListRepository } from '../../../../todo-list/infrastructure/repositories/todo-list.repository';

@CommandHandler(EditTodoListCommand)
export class EditTodoListHandler
  implements ICommandHandler<EditTodoListCommand>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(command: EditTodoListCommand): Promise<TodoList> {
    return this.todoListRepository.create(command.title, command.userId);
  }
}
