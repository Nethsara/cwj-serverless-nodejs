import { UserModel } from "../models/UserModel";
export class UserRespository {
  constructor() {}

  async createAccount({ email, password, salt, phone, userType }: UserModel) {}
}
