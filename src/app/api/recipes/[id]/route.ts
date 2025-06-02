import { deleteRecipe } from '@/lib/data-access-layer/recipeDAL';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  await deleteRecipe(params.id);
  return NextResponse.json({});
}
