export interface IReadableUser {
  status: string;
  readonly name: string;
  readonly surname: string;
  readonly patronymic: string;
  readonly group: string;
  readonly role: string;
  readonly email: string;
  readonly regDate: string;
  token: string;
}
