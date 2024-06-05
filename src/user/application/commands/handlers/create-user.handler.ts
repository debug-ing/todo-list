import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { CreateUserCommand } from '../impl/create-user.command';
import { User } from 'src/user/domain/user.model';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    return this.userRepository.create(command.username, command.password);
  }
}
