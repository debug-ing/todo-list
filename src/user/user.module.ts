import { Module } from '@nestjs/common';
import { UserController } from './interfaces/controllers/user.controller';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserCommandHandlers } from './application/commands/handlers';
import { UserQueryHandlers } from './application/queries/handlers';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/user.model';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../shared/guard/jwt.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    ...UserCommandHandlers,
    ...UserQueryHandlers,
    JwtStrategy,
  ],
})
export class UserModule {}
