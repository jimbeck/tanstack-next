// lib/hooks/recipes.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Recipe {
  id: string;
  name: string;
}

async function fetchRecipes(): Promise<Recipe[]> {
  const res = await fetch('/api/recipes');
  if (!res.ok) {
    throw new Error(`Error fetching recipes: ${res.statusText}`);
  }
  return res.json();
}

async function createRecipe(name: string): Promise<Recipe> {
  const res = await fetch('/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name: name}),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to create recipe: ${res.statusText}`);
  }
  return res.json();
}

async function deleteRecipe(id: string): Promise<void> {
  const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to delete recipe: ${res.statusText}`);
  }
}

export function useRecipes() {
  return useQuery<Recipe[], Error>({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (name: string) => createRecipe(name),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['recipes']});
    },
   },);
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (id: string) => deleteRecipe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['recipes']});
    },
   },);
}
