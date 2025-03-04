import { Context } from "elysia";
import { UserService } from "../service/userService";
import { ResponseError } from "../error/response-error";

export class UserController {
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
      if (errors instanceof ResponseError) {
        throw errors; // ⬅ Langsung throw tanpa modifikasi
      }
      console.error(errors);
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  static async getUsers(ctx: Context) {
    try {
      //get all users
      const response = await UserService.getAll();
      ctx.set.status = 200;
      return {
        data: response,
      };
    } catch (e: any) {
      console.error(`Error getting posts: ${e}`);
    }
  }
}
