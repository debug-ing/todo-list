import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTodoItemDto } from './create-todo-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EditTodoItemDto extends CreateTodoItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
