import { createRecipe, getRecipes } from "@/lib/data-access-layer/recipeDAL";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return NextResponse.json(await getRecipes());
}

export async function POST(request: Request) {
    return NextResponse.json(await createRecipe());
}
