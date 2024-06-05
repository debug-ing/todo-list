import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoListDto } from '../dtos/create-todo-list.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../../../todo-list/application/commands/impl/create-todo-list.command';
import { EditTodoListCommand } from '../../../todo-list/application/commands/impl/edit-todo-list.command';
import { GetTodoListQuery } from '../../../todo-list/application/queries/impl/get-todo-list.query';
import { GetItemTodoListQuery } from '../../../todo-list/application/queries/impl/get-item-todo-list.query';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../../../shared/guard/jwt.guard';
import { User } from '../../../shared/decorator/user.decorator';
import { DeleteTodoListCommand } from '../../../todo-list/application/commands/impl/delete-todo-list.command';

@Controller('todo-lists')
@ApiTags('todo-lists')
export class TodoListController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  create(@User() userId: string, @Body() body: CreateTodoListDto) {
    return this.commandBus.execute(
      new CreateTodoListCommand(body.title, userId),
    );
  }

  @Get()
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  findAll(@User() userId: string) {
    return this.queryBus.execute(new GetTodoListQuery(userId));
  }

  @Get(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  findOne(@User() userId: string, @Param('id') id: string) {
    return this.queryBus.execute(new GetItemTodoListQuery(id, userId));
  }

  @Put(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  update(
    @User() userId: string,
    @Param('id') id: string,
    @Body() body: CreateTodoListDto,
  ) {
    return this.commandBus.execute(
      new EditTodoListCommand(id, body.title, userId),
    );
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  remove(@User() userId: string, @Param('id') id: string) {
    return this.commandBus.execute(new DeleteTodoListCommand(userId, id));
  }
}
