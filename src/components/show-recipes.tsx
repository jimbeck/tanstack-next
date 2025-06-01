'use client';

import { useRecipes } from '@/lib/hooks/recipes';
import { CreateRecipeForm } from './create-recipe-form';
import { RecipeCard } from './recipe-card';

export default function ShowRecipes() {
  const { data: recipes, isError, isLoading } = useRecipes();

  if (isLoading) {
    return <div className="text-center py-8">Loading…</div>;
  }
  if (isError) {
    return <div className="text-center py-8 text-red-600">Error loading recipes</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">Recipes</h1>
      <CreateRecipeForm/>
      <div className="space-y-4">
        {(recipes ?? []).map((recipe: { id: string; name: string }) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
            />
        ))}
      </div>
    </div>
  );
}
