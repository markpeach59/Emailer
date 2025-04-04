import { Link } from "@remix-run/react";
import { Button } from "../components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { Logo } from "./Logo";

export function NavBar() {
  return (
    <div className="w-full bg-background flex justify-center">
      <nav className="flex items-center justify-between p-4 max-w-[1500px] w-full">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>
        <ul className="flex space-x-4">
          <SignedIn>
            <li><Link to="/dashboard" className="text-foreground hover:text-primary">Dashboard</Link></li>
            <li><Link to="/reschedule" className="text-foreground hover:text-primary">Reschedule</Link></li>
            <li><Link to="/cancellation" className="text-foreground hover:text-primary">Cancel</Link></li>
            <li><Link to="/first-visit" className="text-foreground hover:text-primary">First Visit</Link></li>
          </SignedIn>
        </ul>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </SignedOut>
        </div>
      </nav>
    </div>
  );
}