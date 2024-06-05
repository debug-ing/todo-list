import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserHandler } from './create-user.handler';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { CreateUserCommand } from '../impl/create-user.command';
import { User } from '../../../domain/user.model';
import { getModelToken } from '@nestjs/mongoose';

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const userModelMock = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
      ],
    }).compile();

    handler = module.get<CreateUserHandler>(CreateUserHandler);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should create a new user', async () => {
    const mockCommand: CreateUserCommand = {
      username: 'newuser',
      password: 'newpassword',
    };

    const mockUser = {
      _id: '1',
      username: 'newuser',
      password: 'newpassword',
    } as any;

    jest.spyOn(userRepository, 'create').mockResolvedValue(mockUser);

    const result = await handler.execute(mockCommand);

    expect(result).toEqual(mockUser);
    expect(userRepository.create).toHaveBeenCalledWith(
      mockCommand.username,
      mockCommand.password,
    );
  });
});
