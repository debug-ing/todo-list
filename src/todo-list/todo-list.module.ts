import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { TodoList, TodoListSchema } from './domain/todo-list.model';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListController } from './interfaces/controllers/todo-list.controller';
import { TodoListRepository } from './infrastructure/repositories/todo-list.repository';
import { TodoListCommandHandlers } from './application/commands/handlers';
import { TodoListQueryHandlers } from './application/queries/handlers';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
    ]),
  ],
  controllers: [TodoListController],
  providers: [
    TodoListRepository,
    ...TodoListCommandHandlers,
    ...TodoListQueryHandlers,
  ],
})
export class TodoListModule {}
