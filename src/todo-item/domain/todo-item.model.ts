import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class TodoItem extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  priority: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TodoList',
    required: true,
  })
  todoListId: mongoose.Schema.Types.ObjectId;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
