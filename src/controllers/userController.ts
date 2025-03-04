//import prisma client
import { Context } from "elysia";
import prisma from "../../prisma/client";
import { UserService } from "../service/userService";
import { ResponseError } from "../error/response-error";

export class UserController {
  static async getUsersbyid(id: number, ctx: Context) {
    try {
      //get users by id
      const response = await UserService.getById(id);
      ctx.set.status = 200;
      return {
        data: response,
      };
    } catch (errors: any) {
      throw errors;
    }
  }

  static async getUsers() {
    try {
      //get all users
      const user = await prisma.user.findMany({ orderBy: { id: "desc" } });

      //return response json
      return {
        data: user,
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          updatedAt: true,
          createdAt: true,
        },
      };
    } catch (e: unknown) {
      console.error(`Error getting posts: ${e}`);
    }
  }
}
