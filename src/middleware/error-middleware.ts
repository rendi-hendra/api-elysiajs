import { Context, ValidationError } from "elysia";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (error: Error, ctx: Context) => {
  if (error instanceof ZodError) {
    ctx.set.status = 400;
    return { errors: error.format() };
  } else if (error instanceof ResponseError) {
    ctx.set.status = error.status;
    return { errors: error.message };
  } else if (error instanceof ValidationError) {
    const uniqueErrors = new Map();

    error.all.forEach((val) => {
      const path = (val as { path: string }).path.substring(1);
      const message = (val as { message: string }).message;

      // Simpan hanya error pertama untuk setiap path
      if (!uniqueErrors.has(path)) {
        uniqueErrors.set(path, { path, message });
      }
    });

    return {
      error: Array.from(uniqueErrors.values()),
    };
  } else {
    ctx.set.status = 500;
    return { errors: error.message };
  }
};
