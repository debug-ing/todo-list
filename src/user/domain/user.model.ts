import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { TodoList } from '../../todo-list/domain/todo-list.model';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TodoList' }] })
  todoLists: TodoList[];
}

export const UserSchema = SchemaFactory.createForClass(User);
