import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetItemTodoListQuery } from '../impl/get-item-todo-list.query';
import { TodoList } from '../../../../todo-list/domain/todo-list.model';
import { TodoListRepository } from '../../../../todo-list/infrastructure/repositories/todo-list.repository';

@QueryHandler(GetItemTodoListQuery)
export class GetItemTodoListQueryHandler
  implements IQueryHandler<GetItemTodoListQuery>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(
    query: GetItemTodoListQuery,
  ): Promise<{ status: boolean; data?: TodoList; message?: string }> {
    const data = await this.todoListRepository.findOne(query.userId, query.id);
    return { status: true, data };
  }
}
