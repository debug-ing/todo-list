import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../impl/create-todo-list.command';
import { TodoList } from '../../../../todo-list/domain/todo-list.model';
import { TodoListRepository } from '../../../../todo-list/infrastructure/repositories/todo-list.repository';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(command: CreateTodoListCommand): Promise<TodoList> {
    return this.todoListRepository.create(command.title, command.userId);
  }
}
