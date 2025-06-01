'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CreateRecipeFormProps {
  onCreated: () => Promise<any>;
}

export function CreateRecipeForm({ onCreated }: CreateRecipeFormProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) {
      alert('Please enter a title.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to create recipe: ${res.statusText}`
        );
      }

      await onCreated();
      setTitle('');
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
          <Label htmlFor="title" className="mb-1">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
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