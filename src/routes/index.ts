//import elysia
import { Elysia } from "elysia";
import { UserController } from "../controllers/userController";
import { UserRegisterSchema } from "../schema/userSchema";

const routes = new Elysia({ prefix: "/api" });

routes.get("/users/:id", (ctx) =>
  UserController.getUsersbyid(ctx.params.id, ctx)
);
routes.get("/users", (ctx) => UserController.getUsers(ctx));
routes.post("/users", (ctx) => UserController.register(ctx.body, ctx), {
  body: UserRegisterSchema,
});

export default routes;
