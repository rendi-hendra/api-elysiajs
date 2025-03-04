import { Context, Elysia } from "elysia";
import { errorMiddleware } from "../middleware/error-middleware";
import { userRoute } from "../routes";

//initiate elysia
export const web = new Elysia();

web
  .onError(({ error, set }) =>
    errorMiddleware(error as Error, { set } as Context)
  )
  .use(userRoute);
