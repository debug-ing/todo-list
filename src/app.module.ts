import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { TodoItemModule } from './todo-item/todo-item.module';
import { DB_CONFIG } from './config/db';

@Module({
  imports: [
    MongooseModule.forRoot(DB_CONFIG),
    UserModule,
    TodoListModule,
    TodoItemModule,
  ],
})
export class AppModule {}
