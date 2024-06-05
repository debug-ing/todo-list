import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem } from '../../../todo-item/domain/todo-item.model';
//implements IUserRepository
@Injectable()
export class TodoItemRepository {
  constructor(
    @InjectModel(TodoItem.name) private todoItemModel: Model<TodoItem>,
  ) {}
  create(
    title: string,
    description: string,
    priority: number,
    todoListId: string,
  ): Promise<TodoItem> {
    const todoItem = new this.todoItemModel({
      title,
      description,
      priority,
      todoListId,
    });
    return todoItem.save();
  }

  findAll(todoListId: string): Promise<TodoItem[]> {
    return this.todoItemModel
      .find({ todoListId })
      .sort({
        priority: 'asc',
      })
      .exec();
  }

  findOne(todoListId: string, id: string): Promise<TodoItem> {
    return this.todoItemModel.findOne({ todoListId, _id: id }).exec();
  }

  update(
    id: string,
    title: string,
    description: string,
    priority: number,
    todoListId: string,
  ): Promise<TodoItem> {
    return this.todoItemModel
      .findOneAndUpdate(
        { todoListId, _id: id },
        { title, description, priority },
        { new: true },
      )
      .exec();
  }

  remove(todoListId: string, id: string): Promise<TodoItem> {
    return this.todoItemModel.findOneAndDelete({ todoListId, _id: id }).exec();
  }
}
