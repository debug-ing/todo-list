import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../domain/user.model';
import { Model } from 'mongoose';
//implements IUserRepository
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findByUsernameAndPassword(username: string, password: string): Promise<User> {
    return this.userModel.findOne({ username, password }).exec();
  }

  async create(username: string, password: string): Promise<User> {
    const user = new this.userModel({ username, password });
    return user.save();
  }
}
