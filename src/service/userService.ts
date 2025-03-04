import prisma from "../../prisma/client";
import { ResponseError } from "../error/response-error";
import { toUserResponse, UserResponse } from "../model/userModel";

export class UserService {
  static async getById(id: number): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    return toUserResponse(user);
  }
}
