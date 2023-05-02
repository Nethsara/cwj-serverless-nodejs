import { ErrorResponse, SucessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserRespository } from "../repository/userRepository";
import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer";
import { SignupInput } from "../models/dto/SignupInput";
import { AppValidationError } from "../utility/error";
import { GetHashedPassword, GetSalt } from "../utility/password";
@autoInjectable()
export class UserService {
  repository: UserRespository;
  constructor(repository: UserRespository) {
    this.repository = repository;
  }
  //Create , login and validate users
  async VerifyUser(event: APIGatewayProxyEventV2) {
    return SucessResponse({ message: "response from the verify user" });
  }
  async UserLogin(event: APIGatewayProxyEventV2) {
    return SucessResponse({ message: "response from the user login" });
  }
  async CreateUser(event: APIGatewayProxyEventV2) {
    const input = plainToClass(SignupInput, event.body);
    const error = await AppValidationError(input);
    if (error) return ErrorResponse(404, error);

    const salt = await GetSalt();
    const hashedPassword = GetHashedPassword(input.password, salt);

    const data = await this.repository.createAccount({
      email: input.email,
      password: input.password,
      phone: input.phone,
      userType: "BUYER",
      salt,
    });

    // await this.repository.CreateUserOperation();
    return SucessResponse({ input });
  }

  //User profile
  async CreateProfile(event: APIGatewayProxyEventV2) {
    return SucessResponse({ message: "response from the create user" });
  }
  async GetProfile(event: APIGatewayProxyEventV2) {
    return SucessResponse({ message: "response from the get user" });
  }
  async EditProfile(event: APIGatewayProxyEventV2) {
    return SucessResponse({ message: "response from the edit user" });
  }

  //Cart section
  async CreateCart(event: APIGatewayProxyEventV2) {
    return SucessResponse({ message: "response from the create cart" });
  }
  async GetCart(event: APIGatewayProxyEventV2) {
    return SucessResponse({ message: "response from the get cart" });
  }
  async EditCart(event: APIGatewayProxyEventV2) {
    return SucessResponse({ message: "response from the edit cart" });
  }

  //Payment section
  async CreatePayment(event: APIGatewayProxyEventV2) {
    return SucessResponse({ message: "response from the create payment" });
  }
  async GetPayment(event: APIGatewayProxyEventV2) {
    return SucessResponse({ message: "response from the get payment" });
  }
  async EditPayment(event: APIGatewayProxyEventV2) {
    return SucessResponse({ message: "response from the edit payment" });
  }
}
