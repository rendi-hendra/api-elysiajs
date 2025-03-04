import { web } from "./application/web";

//start server on port 3000
web.listen(3000);

console.log(
  `🦊 Elysia is running at http://${web.server?.hostname}:${web.server?.port}`
);
