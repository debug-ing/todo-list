import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoItemQuery } from '../impl/get-todo-item.query';
import { TodoItemRepository } from '../../../../todo-item/infrastructure/repositories/todo-item.repository';
import { TodoItem } from '../../../../todo-item/domain/todo-item.model';
@QueryHandler(GetTodoItemQuery)
export class GetTodoItemQueryHandler
  implements IQueryHandler<GetTodoItemQuery>
{
  constructor(private readonly todoItemRepository: TodoItemRepository) {}

  async execute(
    query: GetTodoItemQuery,
  ): Promise<{ status: boolean; data?: TodoItem[]; message?: string }> {
    const data = await this.todoItemRepository.findAll(query.todoListId);
    return { status: true, data };
  }
}
