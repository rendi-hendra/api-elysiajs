import prisma from "../../prisma/client";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/userModel";

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

  static async getAll(): Promise<UserResponse[]> {
    const user = await prisma.user.findMany();

    return user.map((user) => toUserResponse(user));
  }

  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const [usernameExists, emailExists] = await Promise.all([
      await prisma.user.findUnique({
        where: { username: request.username },
      }),
      await prisma.user.findUnique({
        where: { email: request.email },
      }),
    ]);

    if (usernameExists) {
      throw new ResponseError(400, "Username already exists");
    }

    if (emailExists) {
      throw new ResponseError(400, "Email already exists");
    }

    const hashedPassword = await Bun.password.hash(request.password, {
      algorithm: "bcrypt",
      cost: 12,
    });

    const user = await prisma.user.create({
      data: {
        name: request.name,
        username: request.username,
        email: request.email,
        password: hashedPassword,
      },
    });

    return toUserResponse(user);
  }
}
