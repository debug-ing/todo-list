export class GetItemTodoItemQuery {
  constructor(
    public readonly id: string,
    public readonly todoListId: string,
  ) {}
}
