import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoItemRepository } from '../../../../todo-item/infrastructure/repositories/todo-item.repository';
import { TodoItem } from '../../../../todo-item/domain/todo-item.model';
import { EditTodoItemCommand } from '../impl/edit-todo-item.command';

@CommandHandler(EditTodoItemCommand)
export class EditTodoItemHandler
  implements ICommandHandler<EditTodoItemCommand>
{
  constructor(private readonly todoListRepository: TodoItemRepository) {}

  async execute(command: EditTodoItemCommand): Promise<TodoItem> {
    return this.todoListRepository.update(
      command.id,
      command.title,
      command.description,
      command.priority,
      command.todoListId,
    );
  }
}
