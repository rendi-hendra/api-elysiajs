import { Context } from "elysia";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (error: Error, ctx: Context) => {
  if (error instanceof ZodError) {
    ctx.set.status = 400;
    return { errors: error.format() };
  } else if (error instanceof ResponseError) {
    ctx.set.status = error.status;
    return { errors: error.message };
  } else {
    ctx.set.status = 500;
    return { errors: error.message };
  }
};
