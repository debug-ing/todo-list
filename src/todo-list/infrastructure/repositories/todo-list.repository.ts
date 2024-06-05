import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList } from '../../../todo-list/domain/todo-list.model';

@Injectable()
export class TodoListRepository {
  constructor(@InjectModel(TodoList.name) private userModel: Model<TodoList>) {}
  create(title: string, userId: string): Promise<TodoList> {
    const todoList = new this.userModel({ title, userId });
    return todoList.save();
  }

  findAll(userId: string): Promise<TodoList[]> {
    return this.userModel.find({ userId }).exec();
  }

  findOne(userId: string, id: string): Promise<TodoList> {
    return this.userModel.findOne({ userId, _id: id }).exec();
  }

  update(userId: string, id: string, title: string): Promise<TodoList> {
    return this.userModel
      .findOneAndUpdate({ userId, _id: id }, { title }, { new: true })
      .exec();
  }

  remove(userId: string, id: string): Promise<TodoList> {
    return this.userModel.findOneAndDelete({ userId, _id: id }).exec();
  }
}
