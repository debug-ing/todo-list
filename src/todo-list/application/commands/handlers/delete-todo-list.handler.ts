import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoList } from '../../../../todo-list/domain/todo-list.model';
import { TodoListRepository } from '../../../../todo-list/infrastructure/repositories/todo-list.repository';
import { DeleteTodoListCommand } from '../impl/delete-todo-list.command';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler
  implements ICommandHandler<DeleteTodoListCommand>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(command: DeleteTodoListCommand): Promise<TodoList> {
    return this.todoListRepository.remove(command.userId, command.id);
  }
}
