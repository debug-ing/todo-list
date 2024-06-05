import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetItemTodoItemQuery } from '../impl/get-item-todo-item.query';
import { TodoItemRepository } from '../../../../todo-item/infrastructure/repositories/todo-item.repository';
import { TodoItem } from '../../../../todo-item/domain/todo-item.model';

@QueryHandler(GetItemTodoItemQuery)
export class GetItemTodoItemQueryHandler
  implements IQueryHandler<GetItemTodoItemQuery>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(
    query: GetItemTodoItemQuery,
  ): Promise<{ status: boolean; data?: TodoItem; message?: string }> {
    const data = await this.todoItemRepository.findOne(
      query.todoListId,
      query.id,
    );
    return { status: true, data };
  }
}
