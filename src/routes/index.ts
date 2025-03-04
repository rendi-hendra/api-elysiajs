//import elysia
import { Elysia, t } from "elysia";
import { userModel } from "../schema/userSchema";
import { UserService } from "../service/userService";

const routes = new Elysia({ prefix: "/api" })
  .use(userModel)
  .get(
    "/users/:id",
    async ({ params, set }) => {
      const response = await UserService.getById(params.id);
      set.status = 200;
      return {
        data: response,
      };
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    }
  )
  .get("/users", async ({ set }) => {
    const response = await UserService.getAll();
    set.status = 200;
    return {
      data: response,
    };
  })
  .post(
    "/users",
    async ({ body, set }) => {
      const response = await UserService.register(body);
      set.status = 201;
      return {
        data: response,
      };
    },
    {
      body: "register",
    }
  );

export default routes;
