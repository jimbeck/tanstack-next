'use client';

import { useRecipes } from '@/lib/hooks/recipes';
import { CreateRecipeForm } from './create-recipe-form';
import { RecipeCard } from './recipe-card';

type Props = {
  initialRecipes?: Recipe[];
};

export default function ShowRecipes({ initialRecipes }: Props) {
  const { data: recipes, isError, isLoading } = useRecipes(initialRecipes);

  if (isLoading) {
    return <div className="py-8 text-center">Loading…</div>;
  }
  if (isError) {
    return (
      <div className="py-8 text-center text-red-600">Error loading recipes</div>
    );
  }

  return (
    <div className="mx-auto max-w-lg p-4">
      <h1 className="mb-6 text-center text-3xl font-semibold">Recipes</h1>
      <CreateRecipeForm />
      <div className="space-y-4">
        {(recipes ?? []).map((recipe: { id: string; name: string }) => (
          <RecipeCard key={recipe.id} id={recipe.id} name={recipe.name} />
        ))}
      </div>
    </div>
  );
}
