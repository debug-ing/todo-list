import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../user/application/commands/impl/create-user.command';
import { LoginUserQuery } from '../../../user/application/queries/impl/login-user.query';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.queryBus.execute(
      new LoginUserQuery(body.username, body.password),
    );
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.commandBus.execute(
      new CreateUserCommand(body.username, body.password),
    );
  }
}
