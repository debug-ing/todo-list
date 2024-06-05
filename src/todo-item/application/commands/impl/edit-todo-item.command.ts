export class EditTodoItemCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly priority: number,
    public readonly todoListId: string,
  ) {}
}
