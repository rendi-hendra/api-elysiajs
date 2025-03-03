//import prisma client
import prisma from "../../prisma/client";

/**
 * Getting all posts
 */
export async function getUsersByid(id: number) {
  try {
    //get users by id
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      omit: {
        password: true,
      },
    });

    //return response json
    return {
      data: user,
    };
  } catch (e: unknown) {
    console.error(`Error getting users: ${e}`);
  }
}

export async function getUsers() {
  try {
    //get users by id
    const user = await prisma.user.findMany({ orderBy: { id: "desc" } });

    //return response json
    return {
      data: user,
    };
  } catch (e: unknown) {
    console.error(`Error getting posts: ${e}`);
  }
}
