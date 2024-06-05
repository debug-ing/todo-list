export class GetItemTodoListQuery {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
