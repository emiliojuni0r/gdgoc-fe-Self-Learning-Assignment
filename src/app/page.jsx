import { redirect } from "next/navigation";
import LoginPage from "./(auth)/login/page";
import Link from "next/link";

export default function Home() {
  redirect('/login');

  // return (
  //   <>
  //     <h1>Redirecting to Login...</h1>
  //     <Link href="/login">Go to Login</Link>
  //   </>
  // );
}
