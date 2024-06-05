import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { LoginUserQuery } from '../impl/login-user.query';
import { AuthService } from '../../../../auth/auth.service';

@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(
    query: LoginUserQuery,
  ): Promise<{ status: boolean; data?: { token: string }; message?: string }> {
    const user = await this.userRepository.findByUsernameAndPassword(
      query.username,
      query.password,
    );
    if (!user) return { status: false, message: 'Invalid credentials' };
    return {
      status: true,
      data: {
        token: this.authService.signToken({
          id: user.id,
        }),
      },
    };
  }
}
