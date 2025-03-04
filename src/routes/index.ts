//import elysia
import { Elysia } from "elysia";
import { UserController } from "../controllers/userController";

//import controller

const Routes = new Elysia({ prefix: "/api" })

  //route get by id
  .get("/users/:id", (ctx) =>
    UserController.getUsersbyid(Number(ctx.params.id), ctx)
  )
  .get("/users", () => UserController.getUsers());

export default Routes;
