'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type RecipeCardProps = {
  id: string;
  name: string;
  onDeleted: () => Promise<any>;
};

export function RecipeCard({ id, name, onDeleted }: RecipeCardProps) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))).error ||
          `Failed to delete recipe: ${res.statusText}`;
        throw new Error(err);
      }
      await onDeleted();
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'An unexpected error occurred while deleting.');
    }
  };

  return (
    <Card className="border">
      <CardContent className="flex items-center justify-between p-4">
        <h2 className="text-xl font-medium">{name}</h2>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}