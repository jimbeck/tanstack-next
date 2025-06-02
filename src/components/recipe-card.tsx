'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDeleteRecipe } from '@/lib/hooks/recipes';
import { toast } from 'sonner';

type RecipeCardProps = {
  id: string;
  name: string;
};

export function RecipeCard({ id, name }: RecipeCardProps) {
  const { mutate } = useDeleteRecipe();
  const handleDelete = async () => {
    try {
      await mutate(id);
    } catch (e: any) {
      console.error(e);
      toast(e.message || 'An unexpected error occurred while deleting.');
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
