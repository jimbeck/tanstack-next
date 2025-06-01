import { auth } from '@/auth';
import ShowRecipes from '@/components/show-recipes';
import SignOut from '@/components/signout';
import { getRecipes } from '@/lib/data-access-layer/recipeDAL';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const recipes = await getRecipes();
  return (
    <>
      <div>Welcome, {session.user?.email}</div>
      <SignOut />
      <Suspense
        fallback={<div className="py-8 text-center">Loading recipes...</div>}
      >
        <ShowRecipes initialRecipes={recipes} />
      </Suspense>
    </>
  );
}
