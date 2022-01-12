export class User {

  constructor(
  public id = 1,
  public userName = '',
  public email = '',
  public firstName?: string,
  public lastName?: string,
  public signUpDate = '',
  public password = '') { }
}
