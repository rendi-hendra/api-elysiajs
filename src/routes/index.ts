//import elysia
import { Elysia } from "elysia";
import { UserController } from "../controllers/userController";

//import controller

const routes = new Elysia({ prefix: "/api" });

routes.get("/users/:id", (ctx) =>
  UserController.getUsersbyid(ctx.params.id, ctx)
);
routes.get("/users", (ctx) => UserController.getUsers(ctx));

export default routes;
