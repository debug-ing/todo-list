import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { TodoItem } from 'src/todo-item/domain/todo-item.model';

@Schema()
export class TodoList extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TodoItem' }] })
  todoItems: TodoItem[];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
