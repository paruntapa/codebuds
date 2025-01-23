import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-10">
      home page
      <SignInButton/>
    </div>
  );
}
