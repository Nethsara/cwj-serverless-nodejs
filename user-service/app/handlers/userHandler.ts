import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserService } from "../service/userService";
import { ErrorResponse } from "../utility/response";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { container } from "tsyringe";

const service = container.resolve(UserService);

export const Signup = middy((event: APIGatewayProxyEventV2) => {
  return service.CreateUser(event);
}).use(jsonBodyParser());

export const Login = async (event: APIGatewayProxyEventV2) => {
  return service.UserLogin(event);
};

export const Verify = async (event: APIGatewayProxyEventV2) => {
  return service.VerifyUser(event);
};

export const Profile = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method;

  if (httpMethod === "POST") {
    return service.CreateProfile(event);
  } else if (httpMethod === "GET") {
    return service.GetProfile(event);
  } else if (httpMethod === "PUT") {
    return service.EditProfile(event);
  } else {
    return ErrorResponse(404, "Req Not Found");
  }
};

export const Cart = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method;

  if (httpMethod === "POST") {
    return service.CreateCart(event);
  } else if (httpMethod === "GET") {
    return service.GetCart(event);
  } else if (httpMethod === "PUT") {
    return service.EditCart(event);
  } else {
    return ErrorResponse(404, "Req Not Found");
  }
};

export const Payment = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method;

  if (httpMethod === "POST") {
    return service.CreatePayment(event);
  } else if (httpMethod === "GET") {
    return service.GetPayment(event);
  } else if (httpMethod === "PUT") {
    return service.EditPayment(event);
  } else {
    return ErrorResponse(404, "Req Not Found");
  }
};
