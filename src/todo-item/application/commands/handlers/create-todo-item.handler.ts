import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoItemCommand } from '../impl/create-todo-item.command';
import { TodoItemRepository } from '../../../../todo-item/infrastructure/repositories/todo-item.repository';
import { TodoItem } from '../../../../todo-item/domain/todo-item.model';

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler
  implements ICommandHandler<CreateTodoItemCommand>
{
  constructor(private readonly todoListRepository: TodoItemRepository) {}

  async execute(command: CreateTodoItemCommand): Promise<TodoItem> {
    return this.todoListRepository.create(
      command.title,
      command.description,
      command.priority,
      command.todoListId,
    );
  }
}
