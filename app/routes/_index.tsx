import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { NavBar } from "../components/nav-bar";
import { Button } from "~/components/ui/button";
import { SignedIn, SignedOut, useUser } from "@clerk/remix";


export const meta: MetaFunction = () => {
  return [
    { name: "viewport" , content:"width=device-width, initial-scale=1.0" },
    { title: "Equicise" },
    { name: "description", content: "Welcome to Equicise! horse simulation classes for riders" },
  ];
};

export default function Index() {
  
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center bg-background">
        <div className="text-center">
         <SignedIn>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome, {user?.firstName || 'User'}!</h1>
            <p className="text-xl mb-8 text-muted-foreground">Glad to have you back.</p>
            <Button size="lg" asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome</h1>
            <p className="text-xl mb-2 text-muted-foreground">The EQUICISE Horse Simulator is a powerful training aid for all riders.</p>
            <p className="text mb-8 text-muted-foreground">If you want to Improve your technique, accelerate your learning, gain fitness and become a better rider book a lesson on the Equicise.<br />30 minute private lessons available Tuesday to Sunday each Week</p>
            <Button size="lg" asChild>
              <Link to="/sign-up">Get Started</Link>
            </Button>
          </SignedOut>
        </div>
      </main>
      <footer className="bg-muted p-4 text-center text-muted-foreground">
        © 2025 Equicise ltd. All rights reserved.
      </footer>
    </div>
  );
}
