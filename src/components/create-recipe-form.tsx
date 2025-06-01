'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCreateRecipe } from '@/lib/hooks/recipes';


export function CreateRecipeForm() {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useCreateRecipe();

  const handleCreate = async () => {
    if (!name.trim()) {
      alert('Please enter a name.');
      return;
    }

    setIsSubmitting(true);
    try {
      await mutate(name);
      setName('');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Create New Recipe</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name" className="mb-1">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            placeholder="e.g. Grandma’s Pancakes"
          />
        </div>
        <Button
          onClick={handleCreate}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Creating…' : 'Create Recipe'}
        </Button>
      </CardContent>
    </Card>
  );
}