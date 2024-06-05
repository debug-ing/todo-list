import { Test, TestingModule } from '@nestjs/testing';
import { LoginUserHandler } from './login-user.handler';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { AuthService } from '../../../../auth/auth.service';

import { LoginUserQuery } from '../impl/login-user.query';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../../domain/user.model';
import { JwtService } from '@nestjs/jwt';

describe('LoginUserHandler', () => {
  let handler: LoginUserHandler;
  let userRepository: UserRepository;
  let authService: AuthService;
  beforeEach(async () => {
    const userModelMock = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUserHandler,
        UserRepository,
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
        JwtService,
      ],
    }).compile();

    handler = module.get<LoginUserHandler>(LoginUserHandler);
    userRepository = module.get<UserRepository>(UserRepository);
    authService = module.get<AuthService>(AuthService);
  });

  it('should return status false if user is not found', async () => {
    const mockQuery: LoginUserQuery = {
      username: 'testuser',
      password: 'testpassword',
    };
    jest
      .spyOn(userRepository, 'findByUsernameAndPassword')
      .mockResolvedValue(null);

    const result = await handler.execute(mockQuery);

    expect(result).toEqual({ status: false, message: 'Invalid credentials' });
  });
  it('should return a valid token if user is found', async () => {
    const mockQuery: LoginUserQuery = {
      username: 'testuser',
      password: 'testpassword',
    };
    const mockUser = {
      _id: '1',
      username: 'testuser',
      password: 'testpassword',
    } as any;
    jest
      .spyOn(userRepository, 'findByUsernameAndPassword')
      .mockResolvedValue(mockUser);

    const mockToken = 'mockToken';
    jest.spyOn(authService, 'signToken').mockReturnValue(mockToken);
    const result = await handler.execute(mockQuery);
    expect(result.status).toBe(true);
    expect(result.data.token).toBe(mockToken);
  });
});
