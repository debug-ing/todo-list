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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoItemDto } from '../dtos/create-todo-item.dto';
import { EditTodoItemDto } from '../dtos/edit-todo-item.dto';
import { CreateTodoItemCommand } from '../../../todo-item/application/commands/impl/create-todo-item.command';
import { GetTodoItemQuery } from '../../../todo-item/application/queries/impl/get-todo-item.query';
import { GetItemTodoItemQuery } from '../../../todo-item/application/queries/impl/get-item-todo-item.query';
import { EditTodoItemCommand } from '../../../todo-item/application/commands/impl/edit-todo-item.command';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserGuard } from '../../../shared/guard/jwt.guard';

@Controller('todo-items')
@ApiTags('todo-items')
export class TodoItemController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  create(@Body() body: CreateTodoItemDto): Promise<any> {
    return this.commandBus.execute(
      new CreateTodoItemCommand(
        body.title,
        body.todoListId,
        body.priority,
        body.todoListId,
      ),
    );
  }

  @Get(':todoListId')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  findAll(@Param('todoListId') todoListId: string) {
    return this.queryBus.execute(new GetTodoItemQuery(todoListId));
  }

  @Get(':todoListId/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  findOne(@Param('todoListId') todoListId: string, @Param('id') id: string) {
    return this.queryBus.execute(new GetItemTodoItemQuery(id, todoListId));
  }

  @Put(':id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() body: EditTodoItemDto) {
    return this.commandBus.execute(
      new EditTodoItemCommand(
        id,
        body.title,
        body.todoListId,
        body.priority,
        body.todoListId,
      ),
    );
  }

  @Delete(':id')
  remove() {
    return 'Remove Todo List';
  }
}
