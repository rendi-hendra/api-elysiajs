import { Context } from "elysia";
import { UserService } from "../service/userService";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest } from "../model/userModel";

export class UserController {
  static handleError(errors: unknown) {
    if (errors instanceof ResponseError) {
      throw errors;
    }
    console.error(errors);
    throw new ResponseError(500, "Internal Server Error");
  }

  static async getUsersbyid(id: string, ctx: Context) {
    try {
      const userId = parseInt(id);
      if (isNaN(userId)) {
        throw new ResponseError(400, "Invalid user ID");
      }
      const response = await UserService.getById(userId);
      ctx.set.status = 200;
      return {
        data: response,
      };
    } catch (errors: any) {
      this.handleError(errors);
    }
  }

  static async getUsers(ctx: Context) {
    try {
      const response = await UserService.getAll();
      ctx.set.status = 200;
      return {
        data: response,
      };
    } catch (e: any) {
      console.error(`Error getting posts: ${e}`);
    }
  }

  static async register(request: CreateUserRequest, ctx: Context) {
    try {
      const response = await UserService.register(request);
      ctx.set.status = 201;
      return {
        data: response,
      };
    } catch (errors: any) {
      this.handleError(errors);
    }
  }
}
