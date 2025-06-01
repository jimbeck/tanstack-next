import { auth } from "@/auth";
import ShowRecipes from "@/components/show-recipes";
import SignOut from "@/components/signout";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  return (
    <>
    <div>Welcome, {session.user?.email}</div>
    <SignOut/>
    <ShowRecipes/>
    </>
  
  );
}
