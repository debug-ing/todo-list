import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { TodoItem, TodoItemSchema } from './domain/todo-item.model';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoItemController } from './interfaces/controllers/todo-item.controller';
import { TodoItemCommandHandlers } from './application/commands/handlers';
import { TodoItemRepository } from './infrastructure/repositories/todo-item.repository';
import { TodoItemQueryHandlers } from './application/queries/handlers';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: TodoItem.name, schema: TodoItemSchema },
    ]),
  ],
  controllers: [TodoItemController],
  providers: [
    ...TodoItemCommandHandlers,
    ...TodoItemQueryHandlers,
    TodoItemRepository,
  ],
})
export class TodoItemModule {}
