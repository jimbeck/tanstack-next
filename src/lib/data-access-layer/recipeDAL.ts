import { drizzleClient } from "@/db";
import { recipes } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getRecipes() {
  return await drizzleClient.query.recipes.findMany();
}

export async function createRecipe() {
  return await drizzleClient.insert(recipes).values({
    name: "New Recipe",
    userId: "default_user_id",
  })
}

export async function deleteRecipe(id: string) {
  return await drizzleClient.delete(recipes).where(eq(recipes.id, id));
}