import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}