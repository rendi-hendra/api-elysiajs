import { User } from "@prisma/client";

export type UserResponse = {
  id: number;
  name: string;
  username: string;
  email: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserRequest = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
