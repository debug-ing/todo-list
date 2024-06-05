import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTodoListQuery } from '../impl/get-todo-list.query';
import { TodoList } from '../../../../todo-list/domain/todo-list.model';
import { TodoListRepository } from '../../../../todo-list/infrastructure/repositories/todo-list.repository';

@QueryHandler(GetTodoListQuery)
export class GetTodoListQueryHandler
  implements IQueryHandler<GetTodoListQuery>
{
  constructor(private readonly todoListRepository: TodoListRepository) {}

  async execute(
    query: GetTodoListQuery,
  ): Promise<{ status: boolean; data?: TodoList[]; message?: string }> {
    const data = await this.todoListRepository.findAll(query.userId);
    return { status: true, data };
  }
}
