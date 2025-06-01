import { deleteRecipe } from "@/lib/data-access-layer/recipeDAL";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    await deleteRecipe(id);
    return NextResponse.json({});
}
