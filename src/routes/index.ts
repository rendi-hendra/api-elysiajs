//import elysia
import { Elysia } from "elysia";

//import controller
import { getUsersByid, getUsers } from "../controllers/userController";

const Routes = new Elysia({ prefix: "/api" })

  //route get by id
  .get("/users/:id", ({ params: { id } }) => getUsersByid(Number(id)))
  .get("/users", () => getUsers());

export default Routes;
